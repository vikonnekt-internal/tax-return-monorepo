"use client";
import React, { FC } from "react";
import { BoxProps } from "../Box/types";
import { GridContainer } from "../Grid/GridContainer/GridContainer";
import { ResponsiveSpace } from "../Box/useBoxStyles";

export const simpleSpacing = [2, 2, 3] as ResponsiveSpace;

export const SectionWrapper: FC<React.PropsWithChildren<BoxProps>> = ({
  children,
  ...props
}) => <GridContainer>{children}</GridContainer>;

export default SectionWrapper;
