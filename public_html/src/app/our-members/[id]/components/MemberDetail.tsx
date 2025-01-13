import { ProfileData } from "@/constant/data/members";
import { Flex, Image, Popover } from "antd";
import Link from "next/link";
import MapPopover from "./MapPopover";

type MemberDetailProps = {
  member: ProfileData;
};

const MemberDetail = ({ member }: MemberDetailProps) => {
  return (
    <div
      className="grid w-full members-detail pt-8"
      style={{ gap: '25px' }}
    >
      <div className="sumary-info text-left">
        <Image className="rounded-3xl" src={member.imageUrl} preview={false} />
        <div className="member-name text-[34px] mt-4 text-[#01019b] font-semibold">
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
        <div
          className="detail-info__desc text-left pl-8 pr-7 text-lg pb-4"
          style={{ paddingBottom: '20px' }}>
          {member.description}
        </div>
        <div className="text-white text-left p-10 pb-2 detail-info__other bg-primary w-full grid rounded-3xl gap-4 gap-x-20" style={{ padding: '2rem' }}>
          <div className="contact-detail mb-4 ">
            <h2 className="font-bold">Contact Details</h2>
            <div className="text-base"><strong>P.</strong> {member.contactDetails.phone}</div>
            <div className="text-base"><strong>E.</strong> {member.contactDetails.email}</div>
            <div className="text-base"><strong>A.</strong> {member.contactDetails.address}</div>
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
            <h2 className="font-bold mb-2">Office</h2>
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
              <div className="open-hour mt-8">
                <h2 className="font-bold">Operating Hours:</h2>
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
