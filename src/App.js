import React from "react";
import { Switch, Route } from "react-router-dom";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import NewPaletteForm from "./components/NewPaletteForm";
import SinglePalette from "./components/SinglePalette";
import seedColors from "./seedColors";
import { generatePalette } from "./helpers/colorHelpers";

function App() {
  const [palettes, setPalettes] = React.useState(seedColors);
  function findPalett(id) {
    return palettes.find(palette => palette.id === id);
  }

  function gatherShades(colorId, paletteId) {
    const palette = generatePalette(findPalett(paletteId));
    let shades = [];
    for (const key in palette.colors) {
      const color = palette.colors[key].find(color => color.id === colorId);
      shades.push(color);
    }
    // Object.keys(palette.colors).forEach(key => {
    //   const color = palette.colors[key].find(color => color.id === colorId);
    //   shades.push(color);
    // });
    return shades.slice(1);
  }

  function savePalette(newPalette) {
    setPalettes([...palettes, newPalette]);
  }

  return (
    <div className="App">
      <Switch>
        {/* order matters here */}
        <Route
          exact
          path="/palette/new"
          render={routeProps => (
            <NewPaletteForm
              savePalette={savePalette}
              {...routeProps}
              palettes={palettes}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => <PaletteList palettes={palettes} />}
        />
        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Palette
              palette={generatePalette(findPalett(routeProps.match.params.id))}
            />
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => (
            <SinglePalette
              {...routeProps}
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                findPalett(routeProps.match.params.paletteId)
              )}
              shades={gatherShades(
                routeProps.match.params.colorId,
                routeProps.match.params.paletteId
              )}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
