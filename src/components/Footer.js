import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/FooterStyles";

function Footer({ palette, classes }) {
  return (
    <footer className={classes.PaletteFooter}>
      {palette.paletteName}
      <span className={classes.emoji}>{palette.emoji}</span>
    </footer>
  );
}

export default withStyles(styles)(Footer);
