import { theme } from "../theme";

export const escapeGrid = (gutter: number = theme.grid.gutter.mobile) => ({
  marginLeft: -gutter * 2,
  marginRight: -gutter * 2,
});
