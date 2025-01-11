import { ProfileData } from "@/constant/data/members";
import { Flex, Image, Popover } from "antd";
import Link from "next/link";
import MapPopover from "./MapPopover";

type MemberDetailProps = {
  member: ProfileData;
};

const MemberDetail = ({ member }: MemberDetailProps) => {
  return (
    <div className="grid w-full members-detail pt-8">
      <div className="sumary-info text-left">
        <Image className="rounded-3xl" src={member.imageUrl} />
        <div className="member-name text-[34px] mt-4 text-[#01019b]">
          {member.name}
        </div>
        <div className="position text-lg mt-1 text-[#01019b]">
          {member.title}
        </div>
        <Link
          href={member.linkedInUrl}
          target="_blank"
          className="mt-8 block member-socical"
        >
          <i className="text-5xl bi bi-linkedin"></i>
        </Link>
      </div>
      <div className="detail-info pt-8">
        <div className="detail-info__desc text-left pl-8 pr-7 text-lg pb-4">
          {member.description}
        </div>
        <div className="text-white text-left p-10 pb-2 detail-info__other bg-primary w-full grid rounded-3xl gap-4 gap-x-20">
          <div className="contact-detail">
            <h2 className="font-bold">Contact Details</h2>
            <div className="text-base">P. {member.contactDetails.phone}</div>
            <div className="text-base">E. {member.contactDetails.email}</div>
            <div className="text-base">A. {member.contactDetails.address}</div>
          </div>
          <div className="service-options">
            <h2 className="font-bold">Service Options</h2>
            {member.services.map((s) => (
              <div key={s} className="text-base">
                {s}
              </div>
            ))}
          </div>
          <div className="certificates">
            <h2 className="font-bold">Certificates</h2>
            {member.certificates.map((c) => (
              <div key={c} className="text-base">
                {c}
              </div>
            ))}
          </div>
          <div className="office">
            <h2 className="font-bold">Office</h2>
            <Popover
              content={<MapPopover src={member.location} />}
              placement="rightBottom"
              trigger="click"
            >
              <Flex
                align="center"
                className="underline text-base !mb-2 cursor-pointer"
              >
                <i className="bi bi-geo-alt-fill text-3xl mr-2" />
                {member.office}
              </Flex>
            </Popover>
            {member.operatingHours && (
              <div className="open-hour">
                <div className="font-bold text-lg mb-2">Operating Hours:</div>
                {member.operatingHours.split(",").map((t) => (
                  <div key={t} className="text-lg">
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
