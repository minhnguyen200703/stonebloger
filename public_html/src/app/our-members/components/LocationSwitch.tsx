"use client";
import { Location, locationMapping } from "@/constant/data/members";
import { cn } from "@/lib/utils";
import { Button, Flex, FlexProps } from "antd";
import React, { useState } from "react";

const LocationSwitch = (props: Partial<FlexProps>) => {
  const [isActive, setIsActive] = useState<Location>(Location.AU);
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
            key={l}
          >
            {locationMapping[parseInt(l)]}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};

export default LocationSwitch;
