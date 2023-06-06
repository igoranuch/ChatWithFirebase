import React, { useContext, useEffect } from "react";
import { TextField, Typography, Box, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../utils/constants";
import useStyles from "../styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UIContext } from "../../context/UIContext";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useUser } from "reactfire";

const SignUp = () => {
  const { setAlert } = useContext(UIContext);

  const { data: currentUser } = useUser();

  const styles = useStyles();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser.displayName) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      displayName: Yup.string()
        .min(8, "Мінімум 8 символів")
        .required("Ввведіть ім'я"),
      email: Yup.string()
        .email("Невірний формат адреси")
        .required("Введіть електронну адресу"),
      password: Yup.string()
        .min(8, "Мінімум 8 символів")
        .required("Ввведіть пароль"),
    }),
    onSubmit: async (values) => {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: values.displayName,
          email: values.email,
          photoURL: user.photoURL || "",
        });

        await setDoc(doc(db, "userChats", user.uid), {});

        await updateProfile(auth.currentUser, {
          displayName: values.displayName,
          photoURL: user.photoURL || "",
        });

        navigate("/");
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
          Реєстрація
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
            id="displayName"
            label="Ім'я"
            name="displayName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.displayName}
            error={
              formik.touched.displayName && Boolean(formik.errors.displayName)
            }
            helperText={formik.touched.displayName && formik.errors.displayName}
          />
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
              Зареєструватися
            </Button>
            <Box display="flex" justifyContent="center" marginTop="8px">
              <Link className={styles.link} to={LOGIN_ROUTE}>
                Вже є акаунт? Увійти
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
