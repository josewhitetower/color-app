import React from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import PaletteMettaFrom from "./PaletteMetaFrom"
import { useStyles } from "./styles/NewPaletteFormStyles"

function PaletteFormNav({
  palettes,
  open,
  handleDrawerOpen,
  handleSubmit,
  history
}) {

  const classes = useStyles();
  const [formShowing, setFormOpen] = React.useState(false);

  const showForm = () => {
    setFormOpen(true);
  };
  const hideForm = () => {
    setFormOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => history.goBack()}
            className={classes.button}
          >
            Go Back
          </Button>
          <Button variant="contained" color="primary" onClick={showForm}
          className={classes.button}>
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing && <PaletteMettaFrom palettes={palettes} handleSubmit={handleSubmit} hideForm={hideForm}/>}
    </div>
  );
}

export default PaletteFormNav;
