"use client";
import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { ComboboxDemo } from "./combobox/combobox";

const handleStyle = { left: 10 };

export default function TextUpdaterNode() {
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text: </label>

        <ComboboxDemo />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </>
  );
}
