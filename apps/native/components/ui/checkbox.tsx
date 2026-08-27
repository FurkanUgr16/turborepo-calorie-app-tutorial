import React from "react";
import { Checkbox as HeroUICheckbox, Label } from "heroui-native";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import { View } from "react-native";

export interface CheckboxProps<T extends FieldValues> {
  label?: React.ReactNode;
  name: Path<T>;
  control: Control<T>;
  error?: string;
  className?: string;
}

export const Checkbox = <T extends FieldValues>({
  label,
  name,
  control,
  error,
  className = "",
}: CheckboxProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
  });

  const errorMessage = error || fieldError?.message;
  const isInvalid = !!errorMessage;

  return (
    <View className={`flex-row items-center gap-3 px-2 ${className}`}>
      <HeroUICheckbox
        isSelected={value}
        onSelectedChange={onChange}
        isInvalid={isInvalid}
        className="h-5 w-5 rounded-md bg-input"
      />
      {label && (
        <Label className="flex-1 text-sm leading-4.5 text-neutral-400">
          {label}
        </Label>
      )}
      {isInvalid && (
        <Label className="text-red-500 text-sm absolute -bottom-4 left-10">
          {errorMessage}
        </Label>
      )}
    </View>
  );
};
