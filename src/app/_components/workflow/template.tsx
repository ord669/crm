"use client";
import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import { ComboboxDemo } from "./combobox/combobox";

const handleStyle = { left: 10 };

export default function TextUpdaterNode() {
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);
  return (
    <div className="p-2">
      <Handle type="target" position={Position.Top} />
      <div className="flex flex-col items-center">
        <label htmlFor="text">Choose Template: </label>

        <ComboboxDemo />
      </div>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Left} />
    </div>
  );
}
