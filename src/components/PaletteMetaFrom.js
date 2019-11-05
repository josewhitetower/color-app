import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function PaletteMetaFrom({palettes, handleSubmit}) {
    const [open, setOpen] = React.useState(true);
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
        setOpen(false);
    };
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
            <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
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
    );
}
