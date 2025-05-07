"use client";
import clsx from "clsx";
import { forwardRef } from "react";

interface IInput {
  name?: string;
  value?: string;
  type?: string;
  label?: string;
  className?: string;
  rest?: any;
  error?: any;
  input?: {
    class?: string;
  };
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, IInput>(
  (
    {
      name,
      value,
      type,
      label,
      className,
      error,
      input = { class: "" },
      placeholder,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={clsx("input-container", className)}>
        {label && <label className="input-container__label">{label}</label>}
        <input
          className={clsx(
            error && "input-container__input input-error",
            input.class
          )}
          name={name}
          value={value}
          type={type}
          {...rest}
          ref={ref}
          placeholder={placeholder}
        />
        <label>{error?.message || ""}</label>
      </div>
    );
  }
);

export default Input;
