import { style } from "@vanilla-extract/css";
import { theme } from "../../theme";

export const number = style({
  width: 32,
  height: 32,
  color: theme.color.white,
  fontWeight: theme.typography.semiBold,
  fontSize: 18,
  lineHeight: 0,
  borderRadius: "50%",
  top: 0,
  left: 0,
});

export const progressLine = style({
  display: "none",
  width: 2,
  left: "50%",
  marginLeft: "-1px",
  top: "50%",

  "@media": {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      display: "flex",
    },
  },
});

export const historyProgressLine = style({
  display: "flex",
  width: 2,
  left: "50%",
  marginLeft: "-1px",
  top: "50%",
});
