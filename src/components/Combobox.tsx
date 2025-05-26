"use client";

import { Check } from "lucide-react";
import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Image from "next/image";

export type ComboboxItem = {
  text: string;
  value: string;
  flag?: string;
  alt?: string;
};

type ComboboxProps = {
  id: string;
  dataSource: ComboboxItem[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};
const Combobox = ({ id, dataSource, placeholder, onChange }: ComboboxProps) => {
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    setOpen(false);
    if (onChange) onChange(newValue);
  };

  const selectedItem = dataSource.find((item) => item.value === value);

  return (
    <Select open={open} onOpenChange={setOpen} onValueChange={handleSelect}>
      <SelectTrigger
        className="combo-box flex items-center cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <SelectValue
          placeholder={
            value ? (
              <div className="flex flex-row items-center ps-2">
                {selectedItem?.flag && (
                  <Image
                    src={selectedItem.flag}
                    alt={"flag"}
                    width={24}
                    height={24}
                    className="w-6 h-auto me-1"
                  />
                )}
                {selectedItem?.text}
              </div>
            ) : (
              placeholder || `Select ${id}...`
            )
          }
        />
      </SelectTrigger>
      <SelectContent className="comboBox-popup !h-fit">
        <Command className="h-auto">
          <CommandInput placeholder={`Search ${id}...`} />
          <CommandList>
            <CommandEmpty>No {id} found.</CommandEmpty>
            <CommandGroup>
              {dataSource.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={handleSelect}
                  className="flex items-center cursor-pointer hover:bg-light-300 py-2"
                >
                  <Check
                    className={cn(
                      "me-2 size-2",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.flag && (
                    <Image
                      src={item.flag}
                      alt={"flag"}
                      width={24}
                      height={24}
                      className="w-6 h-auto me-2"
                    />
                  )}
                  {item.text}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </SelectContent>
    </Select>
  );
};

export default Combobox;
