"use client";
import { Location, locationMapping } from "@/constant/data/members";
import { cn } from "@/lib/utils";
import { Button, Flex, FlexProps } from "antd";
import React, { SetStateAction } from "react";

type LocationSwitchProps = Partial<FlexProps> & {
  prefix: string;
  isActive: Location;
  setIsActive: React.Dispatch<SetStateAction<Location>>;
};
const LocationSwitch = ({
  isActive,
  prefix,
  setIsActive,
  ...props
}: LocationSwitchProps) => {
  return (
    <Flex {...props}>
      <Flex
        className={cn(
          "location-switch-bg location-switch",
          isActive === Location.AU ? "left" : "right"
        )}
      >
        {Object.keys(locationMapping).map((l, i) => (
          <Button
            onClick={() => setIsActive(parseInt(l))}
            className={cn(
              "min-w-[86px] !font-semibold",
              isActive !== parseInt(l) ? "!text-white" : ""
            )}
            key={prefix + l}
          >
            {locationMapping[parseInt(l)]}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};

export default LocationSwitch;
