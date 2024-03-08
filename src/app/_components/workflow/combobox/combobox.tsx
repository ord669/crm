"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/app/lib/utils";
import { Button } from "@/app/_components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/app/_components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { api } from "@/trpc/react";
import { useState } from "react";

interface Component {
  type: string;
  text: string;
}

interface Template {
  id: number;
  name: string;
  components: Component[];
  bundle: object;
  channelId: number;
  botId: number;
  languageCode: string;
  namespace: null | string;
  category: string;
  status: "approved" | "rejected";
  statusDetail: null | string;
  templateId: string;
  label: null | string;
  qualityScore: "UNKNOWN" | string;
}

interface Payload {
  items: Template[];
  pagination: {
    next: null | string;
    previous: null | string;
  };
}

export function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { data, isLoading, error } = api.template.getAll.useQuery();

  const templates = data ? data.items : [];

  function handleTemplate(selectedTemplateName: string) {
    setValue(selectedTemplateName);

    const templateText = templates.find(
      (template: any) => template.name === value,
    )?.components[0].text;
    console.log("templateText: ", templateText);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="group relative flex flex-col items-center">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value ? (
              <div className="overflow-hidden">
                {
                  templates.find(
                    (template: Template) => template.name === value,
                  )?.name
                }
              </div>
            ) : (
              "Select Template..."
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 hidden flex-col items-center group-hover:flex">
            <span className="whitespace-no-wrap rounded bg-black px-2 py-1 text-xs text-white">
              {
                templates.find((template: Template) => template.name === value)
                  ?.components[0].text
              }
            </span>
            <div className="-mt-1 h-3 w-3 origin-top-left rotate-45 transform bg-black"></div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Template..." />
          <CommandEmpty>No template found.</CommandEmpty>
          <CommandGroup>
            {templates &&
              templates.map((template: Template) => (
                <CommandItem
                  key={template.id.toString()}
                  value={template.name}
                  onSelect={(currentValue) => {
                    handleTemplate(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === template.templateId
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {template.name}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
