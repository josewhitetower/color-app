import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import ColorBox from "./ColorBox.js";
import Navbar from "./Navbar";
import Footer from "./Footer";

const styles = {
  Palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  colors: {
    height: "90%"
  },
  goBack: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    opacity: 1,
    backgroundColor: "black",
    "& a": {
      color: "white",
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      background: "rgba(255, 255, 255, 0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      border: "none",
      textDecoration: "none"
    }
  }
};

class SinglePalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex"
    };
  }

  changeFormat = format => this.setState({ format });

  render() {
    const { format } = this.state;
    const { paletteName, emoji, id } = this.props.palette;
    const { shades, classes } = this.props;
    const coloBoxes = shades.map(color => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.name}
        showingFullPalette={false}
      />
    ));
    return (
      <div className={classes.Palette}>
        <Navbar handleChange={this.changeFormat} />
        <div className={classes.colors}>
          {coloBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`} className="back-button">
              GO BACK
            </Link>
          </div>
        </div>
        <Footer palette={{ paletteName, emoji }} />
      </div>
    );
  }
}

export default withStyles(styles)(SinglePalette);