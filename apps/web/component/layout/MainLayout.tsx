"use client";

import { Button } from "../Button/Button";
import { Footer } from "../Footer/Footer";
import { GridContainer } from "../Grid/GridContainer/GridContainer";
import { Header } from "../Header/Header";
import { Input } from "../Input/Input";
import { Logo } from "../Logo/Logo";
import { Page } from "../Page/Page";
import { UserDropdown } from "../Header/UserDropdown/UserDropdown";
import { Box } from "../Box/Box";

import { ReactNode, useState } from "react";
import CustomMenu from "./CustomMenu";
const MainLayout = ({
  children,
  loggedIn = false,
}: {
  children: ReactNode;
  loggedIn?: boolean;
}) => {
  const [userOpen, setUserOpen] = useState<"open" | "closed">("open");
  return (
    <Page>
      <div className="w-full flex flex-col items-center">
        <GridContainer className="w-full">
          {!loggedIn ? (
            <div className="w-full flex justify-between items-center py-8">
              <Logo />
              <div className="flex items-center gap-4">
                <Input
                  placeholder="Leitaðu á Ísland.is"
                  backgroundColor="blue"
                  size="sm"
                  name="search"
                  icon={{ name: "search", type: "outline" }}
                />

                <Button variant="utility">{"en"}</Button>
                <Button variant="utility" icon="person" as="span">
                  Mínar síður
                </Button>
                <CustomMenu />
              </div>
            </div>
          ) : (
            <div className="w-full flex items-center justify-between">
              <Header
                info={{
                  title: "Skatturinn",
                  description: "Skattframtal 2024",
                }}
              />
              <UserDropdown
                dropdownState={userOpen}
                setDropdownState={setUserOpen}
              />
            </div>
          )}
        </GridContainer>
      </div>
      <Box>{children}</Box>
      <Box>
        <Footer showMiddleLinks={true} />
      </Box>
    </Page>
  );
};

export default MainLayout;
