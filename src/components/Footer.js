import React from "react";

export default function Footer({ palette }) {
  return (
    <footer className="Palette-footer">
      {palette.paletteName}
      <span className="emoji">{palette.emoji}</span>
    </footer>
  );
}
