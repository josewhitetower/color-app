import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DraggableColorList from "./DraggableColorList";
import arrayMove from "array-move";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";

//import { arrayMove } from "react-sortable-hoc";

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    height: "100vh"
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth,
    height: "calc(100vh - 64px)"
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttons: {
    width: "100%"
  },
  button: {
    width: "50%"
  }
}));

export default function PersistentDrawerLeft({
  savePalette,
  palettes,
  history,
  maxColors = 20
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [colors, setColorList] = React.useState(palettes[0].colors);
  const paletteIsFull = colors.length >= maxColors ? true : undefined;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = newColor => {
    setColorList([...colors, newColor]);
  };

  const removeColor = colorName => {
    setColorList(colors.filter(color => color.name !== colorName));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColorList(arrayMove(colors, oldIndex, newIndex));
  };

  const handleSubmit = newPaletteName => {
    const palette = {
      colors,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      paletteName: newPaletteName
    };
    savePalette(palette);
    history.push("/");
  };

  const clearColors = () => {
    setColorList([]);
  };

  const addRandomColor = () => {
    //pick random color from existin palettes
    const allColors = palettes.map(p => p.colors).flat();
    const rand = Math.floor(Math.random() * allColors.length);
    const colorAlreadyExists = colors.some(
      color => color.name === allColors[rand].name
    );
    if (!colorAlreadyExists) {
      setColorList([...colors, allColors[rand]]);
    } else console.error("color exists", allColors[rand]);
  };
  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleSubmit={handleSubmit}
        history={history}
        palettes={palettes}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4">Design your palette</Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearColors}
              className={classes.button}
            >
              Clear palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={paletteIsFull}
              className={classes.button}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            addNewColor={addNewColor}
            paletteIsFull={paletteIsFull}
            colors={colors}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}
