"use client";
import { Button } from "../Button/Button";
import { Menu } from "../Menu/Menu";

const CustomMenu = () => {
  return (
    <Menu
      asideBottomLinks={[
        {
          href: "#",
          text: "Heilsuvera",
        },
        {
          href: "#",
          text: "Samráðsgátt",
        },
        {
          href: "#",
          text: "Mannanöfn",
        },
        {
          href: "#",
          text: "Undirskriftarlistar",
        },
        {
          href: "#",
          text: "Opin gögn",
        },
        {
          href: "#",
          text: "Opinber nýsköpun",
        },
        {
          href: "#",
          text: "Tekjusagan",
        },
      ]}
      asideBottomTitle="Aðrir opinberir vefir"
      asideTopLinks={[
        {
          href: "#",
          text: "Stofnanir",
        },
        {
          href: "#",
          text: "Stafrænt Ísland",
        },
        {
          href: "#",
          sub: [
            {
              href: "#",
              text: "Viskuausan",
            },
            {
              href: "#",
              text: "Ísland UI",
            },
            {
              href: "#",
              text: "Hönnunarkerfi",
            },
            {
              href: "#",
              text: "Efnisstefna",
            },
          ],
          text: "Þróun",
        },
        {
          href: "#",
          sub: [
            {
              href: "#",
              text: "linkur á eitthvað",
            },
          ],
          text: "Upplýsingarsvæði",
        },
      ]}
      baseId="story"
      languageSwitchText="EN"
      mainLinks={[
        {
          href: "#",
          text: "Akstur og bifreiðar",
        },
        {
          href: "#",
          text: "Atvinnurekstur og sjálfstætt starfandi",
        },
        {
          href: "#",
          text: "Dómstólar og réttarfar",
        },
        {
          href: "#",
          text: "Fjármál og skattar",
        },
        {
          href: "#",
          text: "Fjölskylda og velferð",
        },
        {
          href: "#",
          text: "Heilbrigðismál",
        },
        {
          href: "#",
          text: "Húsnæðismál",
        },
        {
          href: "#",
          text: "Iðnaður",
        },
        {
          href: "#",
          text: "Innflytjendamál",
        },
        {
          href: "#",
          text: "Launþegi, réttindi og lífeyrir",
        },
        {
          href: "#",
          text: "Málefni fatlaðs fólks",
        },
        {
          href: "#",
          text: "Menntun",
        },
        {
          href: "#",
          text: "Neytendamál",
        },
        {
          href: "#",
          text: "Samfélag og réttindi",
        },
        {
          href: "#",
          text: "Samgöngur",
        },
        {
          href: "#",
          text: "Umhverfismál",
        },
        {
          href: "#",
          text: "Vegabréf, ferðalög og búseta erlendis",
        },
        {
          href: "#",
          text: "Vörur og þjónusta Ísland.is",
        },
      ]}
      mainTitle="Þjónustuflokkar"
      menuButton={
        <Button variant="utility" icon="menu" as="span">
          Valmynd
        </Button>
      }
      myPagesText="Mínar síður"
    />
  );
};

export default CustomMenu;
