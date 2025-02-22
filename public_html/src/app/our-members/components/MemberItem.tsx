import { Personal } from "@/constant/data/members";
import { Flex, Image } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
type MemberItemProps = {
  member: Personal;
};

const MemberItem = ({ member }: MemberItemProps) => {
  return (
    <Flex
      key={member.id}
      gap={15}
      className="member-item rounded-2xl overflow-hidden"
    >
      <div className="flex h-fit max-w-[50%]">
        <Image src={member.imageUrl} className="rounded-2xl" preview={false} />
      </div>
      <div className="member-info text-white w-full text-left">
        <div className="member-info-inner flex flex-col gap-2 h-full pt-6 pb-4">
          <h3 style={{ lineHeight: "1.8rem" }} className="region font-semibold">
            {member.region}
          </h3>
          <div className="member-services">
            {member.services.map((m, i) => (
              <div className="text-xm" key={i}>
                {m}
              </div>
            ))}
          </div>
          <Flex
            justify="space-between"
            align="center"
            className="member-name text-lg !mt-auto !pr-2"
          >
            {member.name}
            <Link href={`/our-members/${member.id}`} className="member-link">
              <i className="bi bi-arrow-right"></i>
            </Link>
          </Flex>
        </div>
      </div>
    </Flex>
  );
};

export default MemberItem;
