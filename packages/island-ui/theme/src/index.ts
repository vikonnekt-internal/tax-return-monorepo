import * as HelperStylesExports from "./lib/helperStyles.css";
export const helperStyles = { ...HelperStylesExports };
export * from "./lib/colors/colors";
export * from "./lib/theme";

// Basic theme export
export const theme = {
  spacing: {
    0: 0,
    1: "4px",
    2: "8px",
    3: "16px",
    4: "24px",
    5: "32px",
    6: "48px",
    7: "72px",
    8: "96px",
    9: "128px",
  },
  color: {
    white: "#ffffff",
    black: "#000000",
    blue100: "#e8f4fc",
    blue200: "#c9e6f8",
    blue300: "#8cc8f1",
    blue400: "#4ca9ea",
    blue500: "#0d6efd",
    red100: "#ffeae9",
    red200: "#ffc5c2",
    red300: "#ff8a84",
    red400: "#ff4136",
    green100: "#eafce8",
    green200: "#c9f8c6",
    green300: "#8af180",
    green400: "#4ce83c",
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
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
};

export type Theme = typeof theme;
