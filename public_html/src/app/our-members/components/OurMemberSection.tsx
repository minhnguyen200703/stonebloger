import { members } from "@/constant/data/members";
import React from "react";
import LocationSwitch from "./LocationSwitch";
import MemberItem from "./MemberItem";

const OurMemberSection = () => {
  return (
    <section
      id="our-members"
      className="text-center py-[40px] px-[40px] lg:px-[135px] w-full"
    >
      <h1 style={{ fontSize: "2.5rem" }}>Our Members</h1>
      <div className="flex">
        <LocationSwitch className="!ml-auto" />
      </div>
      <div className="pt-12">
        <div className="w-full members-grid grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {members.map((m) => (
            <MemberItem member={m} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurMemberSection;
