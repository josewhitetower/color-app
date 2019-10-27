import React, { Component } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export default class PaletteFormNav extends Component {
  state = {
    newPaletteName: ""
  };
  componentDidMount() {
    const { palettes } = this.props;
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }
  handleOnPaletteNameChange = e => {
    this.setState({ newPaletteName: e.target.value });
  };

  render() {
    const {
      classes,
      open,
      handleDrawerOpen,
      handleSubmit,
      history
    } = this.props;
    return (
      <div>
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
            <ValidatorForm
              onSubmit={() => handleSubmit(this.state.newPaletteName)}
            >
              <TextValidator
                value={this.state.newPaletteName}
                label="Palette Name"
                onChange={this.handleOnPaletteNameChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "Enter Palette Name",
                  "Palette Name must be unique"
                ]}
              />

              <Button
                variant="contained"
                color="secondary"
                onClick={() => history.goBack()}
              >
                Go Back
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
