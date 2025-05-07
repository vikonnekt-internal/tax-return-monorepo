import React from "react";

import * as styles from "./Page.css";
import { Box } from "../Box/Box";
import { BoxProps } from "../Box/types";

interface PageProps {
  component?: BoxProps["component"];
}

export const Page: React.FC<React.PropsWithChildren<PageProps>> = ({
  component = "main",
  children,
}) => (
  <Box className={styles.container} component={component}>
    {children}
  </Box>
);
