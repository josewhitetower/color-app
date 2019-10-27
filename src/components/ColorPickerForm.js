import React from "react";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
export default function ColorPickerForm({
  addNewColor,
  paletteIsFull,
  colors
}) {
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
          disabled={paletteIsFull}
        >
          {paletteIsFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
}
