"use client";

import React, { FC, ButtonHTMLAttributes, ReactNode } from "react";

// Simple theme definition
const theme = {
  color: {
    white: "#ffffff",
    black: "#000000",
    blue100: "#e8f4fc",
    blue500: "#0d6efd",
  },
  typography: {
    fontFamily: {
      ibm: '"IBM Plex Sans", sans-serif',
      mono: '"IBM Plex Mono", monospace',
    },
    fontSize: {
      base: "1rem",
    },
  },
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...rest
}) => {
  const getStyle = () => {
    const baseStyle = {
      padding: "8px 16px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      fontFamily: theme.typography.fontFamily.ibm,
      fontSize: theme.typography.fontSize.base,
      fontWeight: 500,
      transition: "all 0.2s ease-in-out",
    };

    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          backgroundColor: theme.color.blue500,
          color: theme.color.white,
        };
      case "secondary":
        return {
          ...baseStyle,
          backgroundColor: theme.color.blue100,
          color: theme.color.blue500,
        };
      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          color: theme.color.blue500,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <button style={getStyle()} {...rest}>
      {children}
    </button>
  );
};
