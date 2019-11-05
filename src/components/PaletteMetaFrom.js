import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function PaletteMetaFrom({palettes, handleSubmit}) {
    const [open, setOpen] = React.useState(false);
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
            <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send updates
                occasionally.
            </DialogContentText>
            <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                <TextValidator
                value={newPaletteName}
                label="Palette Name"
                onChange={handleOnPaletteNameChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                    "Enter Palette Name",
                    "Palette Name must be unique"
                ]}
                />

                <Button variant="contained" color="primary" type="submit">
                Save Palette
                </Button>
            </ValidatorForm>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
                Subscribe
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
