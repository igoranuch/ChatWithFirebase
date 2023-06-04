import { Grid } from "@material-ui/core";
import useStyles from "../styles";

const Loader = () => {
  const styles = useStyles();

  return (
    <div className={styles.loaderContainer}>
      <Grid container alignItems="center" direction="column">
        <div className="lds-hourglass"></div>
      </Grid>
    </div>
  );
};

export default Loader;
