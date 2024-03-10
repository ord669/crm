"use client";
import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import { ComboboxDemo } from "./combobox/combobox";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "@/app/lib/CustomTimePicker.css";
import { Label } from "../ui/label";

interface TextUpdaterNodeProps {
  time?: string;
  setTime?: (time: string) => void;
  // Include other props as needed, for example:
  // nodeProps: YourTypeHere; // Define a type for this if you have other props
}
export default function TextUpdaterNode({
  time,
  setTime,
}: TextUpdaterNodeProps) {
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  const handleTimeChange = (value: string | null) => {
    console.log("value: ", value);
    if (value !== null) {
      if (setTime) setTime(value);
    } else {
    }
  };
  return (
    <div className="p-2">
      <Handle type="target" position={Position.Top} />
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="text">Choose Template: </label>

        <ComboboxDemo />
        <div className="flex flex-col items-center gap-2 ">
          <Label htmlFor="Days">Time</Label>
          <TimePicker
            onChange={handleTimeChange}
            className="my-time-picker"
            value={time}
            format="HH:mm"
            disableClock={true}
          />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Left} />
    </div>
  );
}
