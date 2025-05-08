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
import { ReactNode, useState, useEffect } from "react";
import CustomMenu from "./CustomMenu";

const MainLayout = ({
  children,
  loggedIn = false,
}: {
  children: ReactNode;
  loggedIn?: boolean;
}) => {
  const [userOpen, setUserOpen] = useState<"open" | "closed">("open");
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Page>
      <div className="w-full flex flex-col items-center">
        <GridContainer className="w-full">
          {!loggedIn ? (
            <div className="w-full flex flex-col md:flex-row justify-between items-center py-4 md:py-8">
              <div className="w-full md:w-auto flex justify-between items-center">
                <Logo />
                {isMobile && (
                  <Button 
                    variant="utility" 
                    icon="menu" 
                    onClick={toggleMenu}
                    aria-label="Menu"
                  />
                )}
              </div>

              {/* Desktop navigation */}
              {!isMobile && (
                <div className="flex items-center gap-2 md:gap-4">
                  <Input
                    placeholder="Leitaðu á Ísland.is"
                    backgroundColor="blue"
                    size="sm"
                    name="search"
                    icon={{ name: "search", type: "outline" }}
                    className="w-full p-1"
                  />
                  <Button variant="utility">{"en"}</Button>
                  <Button variant="utility" icon="person" as="span">
                    Mínar síður
                  </Button>
                  <CustomMenu />
                </div>
              )}

              {/* Mobile navigation drawer */}
              {isMobile && isMenuOpen && (
                <div className="fixed inset-0 z-50 bg-white">
                  <div className="p-4 flex justify-between items-center border-b">
                    <Logo />
                    <Button 
                      variant="utility" 
                      icon="close" 
                      onClick={toggleMenu}
                      aria-label="Close menu"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-4">
                    <Input
                      placeholder="Leitaðu á Ísland.is"
                      backgroundColor="blue"
                      size="sm"
                      name="search" 
                      icon={{ name: "search", type: "outline" }}
                      className="w-full"
                    />
                    <Button variant="utility" className="w-full flex justify-between">
                      {"en"}
                    </Button>
                    <Button variant="utility" icon="person" as="span" className="w-full flex justify-between">
                      Mínar síður
                    </Button>
                    <div className="mt-2">
                      <CustomMenu />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full flex flex-col md:flex-row items-center justify-between py-4">
              <Header
                info={{
                  title: "Skatturinn",
                  description: "Skattframtal 2024",
                }}
              />
              <div className="mt-4 md:mt-0">
                <UserDropdown
                  dropdownState={userOpen}
                  setDropdownState={setUserOpen}
                />
              </div>
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