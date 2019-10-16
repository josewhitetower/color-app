import React from 'react';
import Palette from './components/Palette';
import seedColors from './seedColors'
import {generatePalette} from './helpers/colorHelpers'

function App() {
  console.log(generatePalette(seedColors[2]));

  return (
    <div className="App">
      <Palette {...seedColors[5]}/>
    </div>
  );
}

export default App;
