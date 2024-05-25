"use client";

import { useMemo } from "react";
import { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";

export type Option = { label: string; value: string };

type SelectProps = {
  options: Option[];
  disabled?: boolean;
  placeholder?: string;
  value?: string | null;
  onChange: (value?: string) => void;
  onCreate?: (value: string) => void;
};

export const Select = ({
  value,
  options,
  onChange,
  onCreate,
  disabled,
  placeholder,
}: SelectProps) => {
  const onSelect = (option: SingleValue<Option>) => {
    onChange(option?.value);
  };

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [value, options]);

  return (
    <CreatableSelect
      options={options}
      onChange={onSelect}
      isDisabled={disabled}
      value={formattedValue}
      placeholder={placeholder}
      onCreateOption={onCreate}
      className="text-small h-10"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#E2E8F0",
          ":hover": { borderColor: "#E2E8F0" },
        }),
      }}
    />
  );
};
