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
  color: {
    white: "#ffffff",
    black: "#000000",
    blue100: "#e8f4fc",
    blue500: "#0d6efd",
  },
};

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  padding?: keyof typeof theme.spacing;
  margin?: keyof typeof theme.spacing;
  marginBottom?: keyof typeof theme.spacing;
  marginTop?: keyof typeof theme.spacing;
  marginLeft?: keyof typeof theme.spacing;
  marginRight?: keyof typeof theme.spacing;
  background?: keyof typeof theme.color;
  minHeight?: string;
}

export const Box: FC<BoxProps> = ({
  children,
  padding,
  margin,
  marginBottom,
  marginTop,
  marginLeft,
  marginRight,
  background,
  minHeight,
  ...rest
}) => {
  const style = {
    padding: padding !== undefined ? theme.spacing[padding] : undefined,
    margin: margin !== undefined ? theme.spacing[margin] : undefined,
    marginBottom:
      marginBottom !== undefined ? theme.spacing[marginBottom] : undefined,
    marginTop: marginTop !== undefined ? theme.spacing[marginTop] : undefined,
    marginLeft:
      marginLeft !== undefined ? theme.spacing[marginLeft] : undefined,
    marginRight:
      marginRight !== undefined ? theme.spacing[marginRight] : undefined,
    backgroundColor:
      background !== undefined ? theme.color[background] : undefined,
    minHeight,
  };

  return (
    <div style={style} {...rest}>
      {children}
    </div>
  );
};
