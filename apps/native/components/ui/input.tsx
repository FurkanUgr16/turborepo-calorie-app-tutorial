import React, { useState } from "react";
import { View, Pressable, TextInputProps } from "react-native";
import {
  Input as HeroUIInput,
  TextField,
  Label,
  FieldError,
  cn,
} from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import { useThemeColor } from "heroui-native";

export interface InputProps<T extends FieldValues> extends TextInputProps {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  error?: string;
  className?: string;
  containerClassName?: string;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
}

export const Input = <T extends FieldValues>({
  label,
  name,
  control,
  error,
  className = "",
  containerClassName = "",
  rightElement,
  leftElement,
  secureTextEntry,
  ...props
}: InputProps<T>) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const mutedColor = useThemeColor("muted");

  const {
    field: { onChange, onBlur, value },
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
  });

  const errorMessage = error || fieldError?.message;
  const isInvalid = !!errorMessage;

  const hasPasswordToggle = secureTextEntry && !rightElement;
  const isSecure = secureTextEntry && !isPasswordVisible;

  return (
    <TextField
      isInvalid={isInvalid}
      className={`w-full gap-2 ${containerClassName}`}
    >
      {label && (
        <Label className="ml-1" isInvalid={isInvalid}>
          <Label.Text className="text-[12px] font-semibold tracking-[0.6px] uppercase text-input-placeholder">
            {label}
          </Label.Text>
        </Label>
      )}
      <View className="relative w-full flex-row items-center">
        <HeroUIInput
          value={
            typeof value === "string"
              ? value
              : value == null
                ? ""
                : String(value)
          }
          onChangeText={onChange}
          onBlur={onBlur}
          secureTextEntry={isSecure}
          placeholderColorClassName="text-input-placeholder"
          selectionColorClassName="text-primary"
          className={cn(
            "h-14 flex-1 border-input-border/30 bg-input px-5 text-base text-foreground",
            leftElement ? "pl-12" : "",
            rightElement || hasPasswordToggle ? "pr-14" : "",
            className,
          )}
          isInvalid={isInvalid}
          {...props}
        />
        {leftElement && (
          <View className="absolute left-4 z-10 pointer-events-none">
            {leftElement}
          </View>
        )}
        {hasPasswordToggle ? (
          <Pressable
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            className="absolute right-4 z-10"
            hitSlop={8}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
              size={18}
              color={mutedColor as string}
            />
          </Pressable>
        ) : rightElement ? (
          <View className="absolute right-4 z-10">{rightElement}</View>
        ) : null}
      </View>
      {isInvalid && (
        <FieldError
          isInvalid={isInvalid}
          className="text-danger text-[14px] ml-1"
        >
          {errorMessage}
        </FieldError>
      )}
    </TextField>
  );
};
