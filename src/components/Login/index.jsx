import React, { useContext, useEffect } from "react";
import { TextField, Typography, Box, Button, Container } from "@mui/material";
import { ReactComponent as GoogleIcon } from "../../assets/images/icons8-google.svg";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_UP_ROUTE } from "../../utils/constants";
import useStyles from "../styles";
import { useFormik } from "formik";
import { UIContext } from "../../context/UIContext";
import * as Yup from "yup";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useUser } from "reactfire";

const Login = () => {
  const styles = useStyles();

  const { setAlert } = useContext(UIContext);

  const { data: currentUser } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL || "",
        });

        await setDoc(doc(db, "userChats", user.uid), {});
      }
      navigate("/");
    } catch (err) {
      setAlert({ show: true, severity: "error", message: err.message });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Невірний формат адреси")
        .required("Введіть електронну адресу"),
      password: Yup.string()
        .min(8, "Мінімум 8 символів")
        .required("Ввведіть пароль"),
    }),
    onSubmit: async (values) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
      } catch (err) {
        setAlert({ show: true, severity: "error", message: err.message });
      }
    },
  });

  return (
    <Container size="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "150px",
        }}
      >
        <Typography component="h1" variant="h5">
          Вхід
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          marginTop="8px"
          width="500px"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Електронна адреса"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Box display="flex" flexDirection="column" gap="12px" marginTop="8px">
            <Button type="submit" fullWidth variant="contained">
              Увійти
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ display: "flex", gap: "5px" }}
              onClick={loginWithGoogle}
            >
              <GoogleIcon width="24px" height="24px" />
              Увійти з Google
            </Button>
            <Box display="flex" justifyContent="center" marginTop="8px">
              <Link className={styles.link} to={SIGN_UP_ROUTE}>
                Немає акаунту? Зареєструватися
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
