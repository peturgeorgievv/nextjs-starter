import React from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { cn } from "../../utils/shadcn";
import Label from "@/common/Label/Label";

const convertToValue = (value: string, type: React.HTMLInputTypeAttribute) => {
  if (type === "number") {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? value : parsed;
  }
  if (type === "date" && !value) {
    return null;
  }
  return value;
};

type InputProps<TFieldValues extends FieldValues> = {
  label?: string;
  name: Path<TFieldValues>;
  type?: React.HTMLInputTypeAttribute;
  dataTestId?: string;
  autoComplete?: string;
  placeholder?: string;
  register?: UseFormRegister<TFieldValues>;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: {
    wrapper?: string;
    input?: string;
  };
  min?: number;
  max?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e?: React.MouseEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

function Input<TFieldValues extends FieldValues>({
  label,
  name,
  type = "text",
  dataTestId,
  autoComplete,
  placeholder,
  register,
  disabled = false,
  className,
  min,
  max,
  onChange,
  onClick,
  value,
  onKeyDown,
  onBlur,
}: InputProps<TFieldValues>) {
  return (
    <div
      className={cn(
        "grid w-full max-w-sm items-center gap-1.5",
        className?.wrapper
      )}
    >
      {label && <Label htmlFor={name} label={label} />}
      <input
        autoComplete={autoComplete}
        data-testid={dataTestId}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className?.input
        )}
        disabled={disabled}
        min={min}
        max={max}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        {...(register &&
          register(name, {
            setValueAs: (v) => convertToValue(v, type),
          }))}
        onClick={onClick}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default Input;
