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

export type ComboBoxComponentItem = {
  text: string;
  value: string;
  flag?: string;
  alt?: string;
};

type ComboBoxComponentProps = {
  id: string;
  dataSource: ComboBoxComponentItem[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

const ComboBoxComponent = ({
  id,
  dataSource,
  placeholder,
  onChange,
  className,
}: ComboBoxComponentProps) => {
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
        className={cn(
          "combo-box flex items-center cursor-pointer w-full",
          className
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <SelectValue
          placeholder={
            value ? (
              <div className="flex flex-row items-center ps-2">
                {selectedItem?.flag && (
                  <Image
                    src={selectedItem.flag}
                    alt={selectedItem.alt || `${selectedItem.text} flag`}
                    width={20}
                    height={20}
                    className="w-5 h-auto me-1 sm:me-2"
                  />
                )}
                <span className="p-16-semibold text-[var(--color-dark-100)] text-sm sm:text-base">
                  {selectedItem?.text}
                </span>
              </div>
            ) : (
              <span className="p-16-semibold text-[var(--color-gray-100)] text-sm sm:text-base">
                {placeholder || `Select ${id}...`}
              </span>
            )
          }
        />
      </SelectTrigger>
      <SelectContent className="comboBox-popup">
        <Command className="h-auto ">
          <CommandInput
            placeholder={`Search ${id}...`}
            className="p-1 sm:p-2 text-sm sm:text-base"
          />
          <CommandList >
            <CommandEmpty className="p-1 sm:p-2 text-[var(--color-gray-100)] text-sm sm:text-base">
              No {id} found.
            </CommandEmpty>
            <CommandGroup>
              {dataSource.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={handleSelect}
                  className="items-center cursor-pointer hover:bg-[var(--color-light-300)] py-1 sm:py-2 px-2"
                >
                  <Check
                    className={cn(
                      "me-1 sm:me-2 size-3 sm:size-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.flag && (
                    <Image
                      src={item.flag}
                      alt={item.alt || `${item.text} flag`}
                      width={20}
                      height={20}
                      className="w-5 h-auto me-1 sm:me-2"
                    />
                  )}
                  <span className="p-16-semibold text-[var(--color-dark-100)] text-sm sm:text-base">
                    {item.text}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </SelectContent>
    </Select>
  );
};

export default ComboBoxComponent;
