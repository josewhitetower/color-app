import React from "react";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const useStyles = makeStyles(() => ({
  picker: {
    width: "100% !important",
    marginTop: "2rem"
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem"
  },
  colorNameInput: {
    width: "100%",
    height: "70px"
  }
}));

export default function ColorPickerForm({
  addNewColor,
  paletteIsFull,
  colors
}) {
  const classes = useStyles();
  const [currentColor, setCurrentColor] = React.useState({
    color: "#F30606",
    name: "red"
  });
  const [newColorName, setNewColorName] = React.useState("");
  React.useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule("isColorUnique", () =>
      colors.every(({ color }) => color !== currentColor)
    );
  });

  const handleOnChange = e => {
    setNewColorName(e.target.value);
  };

  const handleChangeComplete = newColor => {
    setCurrentColor(newColor.hex);
  };

  const handleSubmit = () => {
    const newColor = {
      color: currentColor,
      name: newColorName
    };
    addNewColor(newColor);
    setNewColorName("");
  };
  return (
    <div>
      <ChromePicker
        onChangeComplete={handleChangeComplete}
        color={currentColor}
        className={classes.picker}
      />
      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator
          value={newColorName}
          onChange={handleOnChange}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "This field is required",
            "Color Name must be unique",
            "Color alredy used"
          ]}
          className={classes.colorNameInput}
          placeholder="Color Name"
          variant="filled"
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: paletteIsFull
              ? "rgba(0, 0, 0, 0.12)"
              : currentColor
          }}
          type="submit"
          className={classes.addColor}
          disabled={paletteIsFull}
        >
          {paletteIsFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
}
