import { Colors } from "../theme";
import { Text } from "../Text/Text";
import React, { FC, Children } from "react";
import { Icon } from "../IconRC/Icon";

interface BreadcrumbsProps {
  label?: string;
  color?: Colors;
  separatorColor?: Colors;
}

export const Breadcrumbs: FC<React.PropsWithChildren<BreadcrumbsProps>> = ({
  label = "breadcrumb",
  color = "blue400",
  separatorColor = "blue400",
  children,
}) => {
  const crumbs = Children.toArray(children).filter((c) => c);

  return (
    <div className="flex" aria-label={label}>
      {crumbs.map((child, index) => (
        <span className="flex items-center" key={index}>
          <Text variant="eyebrow" as="span" color={color}>
            {child}
          </Text>
          {crumbs.length - 1 > index && (
            <span className="w-[4px] h-[4px] bg-blue-500 rounded-full mx-2">
            </span>
          )}
        </span>
      ))}
    </div>
  );
};

export const BreadcrumbsDeprecated = Breadcrumbs;
