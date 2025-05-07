"use client";

import React, { FC, HTMLAttributes, ReactNode } from "react";

// Simple theme definition
const theme = {
  spacing: {
    0: 0,
    1: "4px",
    2: "8px",
    3: "16px",
    4: "24px",
    5: "32px",
    6: "48px",
  },
  typography: {
    fontFamily: {
      ibm: '"IBM Plex Sans", sans-serif',
      mono: '"IBM Plex Mono", monospace',
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
  },
};

interface TextProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  marginBottom?: keyof typeof theme.spacing;
}

export const Text: FC<TextProps> = ({
  children,
  variant = "p",
  marginBottom,
  ...rest
}) => {
  const getStyle = () => {
    const baseStyle = {
      marginBottom:
        marginBottom !== undefined ? theme.spacing[marginBottom] : undefined,
      fontFamily: theme.typography.fontFamily.ibm,
    };

    switch (variant) {
      case "h1":
        return {
          ...baseStyle,
          fontSize: theme.typography.fontSize["5xl"],
          fontWeight: 700,
        };
      case "h2":
        return {
          ...baseStyle,
          fontSize: theme.typography.fontSize["4xl"],
          fontWeight: 700,
        };
      case "h3":
        return {
          ...baseStyle,
          fontSize: theme.typography.fontSize["3xl"],
          fontWeight: 600,
        };
      case "h4":
        return {
          ...baseStyle,
          fontSize: theme.typography.fontSize["2xl"],
          fontWeight: 600,
        };
      case "h5":
        return {
          ...baseStyle,
          fontSize: theme.typography.fontSize.xl,
          fontWeight: 600,
        };
      case "h6":
        return {
          ...baseStyle,
          fontSize: theme.typography.fontSize.lg,
          fontWeight: 600,
        };
      case "p":
        return {
          ...baseStyle,
          fontSize: theme.typography.fontSize.base,
          fontWeight: 400,
        };
      case "span":
        return {
          ...baseStyle,
          fontSize: theme.typography.fontSize.base,
          fontWeight: 400,
          display: "inline",
        };
      default:
        return baseStyle;
    }
  };

  return React.createElement(variant, { style: getStyle(), ...rest }, children);
};
