"use client";
import { offices } from "@/constant/data/office";
import OfficeItem from "./OfficeItem";
import { Location } from "@/constant/data/members";
import { useState, useMemo } from "react";
import LocationSwitch from "./LocationSwitch";

const OfficesSection = () => {
  const [isActive, setIsActive] = useState<Location>(Location.AU);
  const filteredOffice = useMemo(() => {
    return offices.filter((m) => m.location === isActive);
  }, [isActive]);
  return (
    <section
      id="associate-offices"
      className="text-center py-[40px] px-[40px] lg:px-[70px] w-full"
    >
      <h1 style={{ fontSize: "2.5rem" }}>Associate Offices</h1>
      <div className="flex">
        <LocationSwitch
          prefix="office"
          isActive={isActive}
          setIsActive={setIsActive}
          className="!ml-auto"
        />
      </div>
      <div className="pt-12">
        <div className="w-full members-grid grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-6">
          {filteredOffice.map((m) => (
            <OfficeItem office={m} key={"office-" + m.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfficesSection;
