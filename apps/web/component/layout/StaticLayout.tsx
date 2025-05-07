"use client";

import { GridContainer } from "../Grid/GridContainer/GridContainer";
import { GridRow } from "../Grid/GridRow/GridRow";
import { GridColumn } from "../Grid/GridColumn/GridColumn";
import { ReactNode } from "react";

interface PropTypes {
  main: ReactNode;
  aside?: ReactNode;
}

function StaticLayout({ main, aside }: PropTypes) {
  const asideBottomLinks = [
    {
      text: "hi",
      href: "/",
    },
    {
      text: "hi",
      href: "/",
    },
  ];
  return (
    <GridContainer>
      <GridRow>
        <GridColumn span={["12/12", "12/12", "5/12", "4/12", "3/12"]}>
          {aside}
        </GridColumn>
        <GridColumn span={["12/12", "12/12", "7/12", "8/12", "9/12"]}>
          {main}
        </GridColumn>
      </GridRow>
    </GridContainer>
  );
}

export default StaticLayout;
