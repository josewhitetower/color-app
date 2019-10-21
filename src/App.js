import React from "react";
import { Switch, Route } from "react-router-dom";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SinglePalette from "./components/SinglePalette";
import seedColors from "./seedColors";
import { generatePalette } from "./helpers/colorHelpers";

function App() {
  function findPalett(id) {
    return seedColors.find(palette => palette.id === id);
  }

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => <PaletteList palettes={seedColors} />}
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
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
