import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "emoji-mart/css/emoji-mart.css"
import {Picker} from "emoji-mart";

export default function PaletteMetaFrom({palettes, handleSubmit, hideForm}) {
    const [stage, setStage] = React.useState("name");
    const [newPaletteName, setNewPaletteName] = React.useState("");

    React.useEffect(() => {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
        palettes.every(
            ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
        )
        );
    });

    const handleOnPaletteNameChange = e => {
        setNewPaletteName(e.target.value);
    };

    const handleClose = () => {
        setStage(false);
        hideForm();
    };

    const showEmojiPicker = () => {
        setStage("emoji");
    };

    const savePalette = emoji => {
        const palette = { paletteName: newPaletteName, emoji: emoji.native}
        handleSubmit(palette);
    };


    return (
        <>
            <Dialog open={stage === "emoji"} onClose={handleClose}>
                <Picker onSelect={savePalette} title="Pick a palette emoji..."/>
            </Dialog>
            <Dialog open={stage==="name"} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={showEmojiPicker}>
                    <DialogContent>
                    <DialogContentText>
                        Please enter a unique name for palette
                        </DialogContentText>
                        <TextValidator
                        value={newPaletteName}
                        label="Palette Name"
                        fullWidth
                        margin="normal"
                        onChange={handleOnPaletteNameChange}
                        validators={["required", "isPaletteNameUnique"]}
                        errorMessages={[
                            "Enter Palette Name",
                            "Palette Name must be unique"
                        ]}
                        />
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            Save Palette
                            </Button>
                        </DialogActions>
                </ValidatorForm>
            </Dialog>
        </>
    );
}
