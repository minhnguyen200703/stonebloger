"use client";
import { Location, members } from "@/constant/data/members";
import LocationSwitch from "./LocationSwitch";
import MemberItem from "./MemberItem";
import { useMemo, useState } from "react";

const OurMemberSection = () => {
  const [isActive, setIsActive] = useState<Location>(Location.AU);
  const filteredMember = useMemo(() => {
    return members.filter((m) => m.location === isActive);
  }, [isActive]);

  return (
    <section
      id="our-members"
      className="text-center py-[40px] px-[40px] lg:px-[135px] w-full"
    >
      <h1 style={{ fontSize: "2.5rem" }}>Our Members</h1>
      <div className="flex">
        <LocationSwitch
          prefix="member"
          isActive={isActive}
          setIsActive={setIsActive}
          className="!ml-auto"
        />
      </div>
      <div className="pt-12">
        <div className="w-full members-grid grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {filteredMember.map((m) => (
            <MemberItem member={m} key={"member-" + m.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurMemberSection;
