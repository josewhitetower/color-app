import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";

function DraggableColorList({ colors, removeColor }) {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, index) => (
        <DraggableColorBox
          color={color}
          key={color.name}
          index={index}
          removeColor={removeColor}
        />
      ))}
    </div>
  );
}

export default SortableContainer(DraggableColorList);
