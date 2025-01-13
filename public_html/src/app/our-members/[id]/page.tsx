"use client";
import { useParams } from "next/navigation";
import "@/styles/base.css";
import "@/styles/members.css";
import { profileDatas } from "@/constant/data/members";
import { useMemo } from "react";
import { last } from "lodash";
import MemberDetail from "./components/MemberDetail";

const page = () => {
  const { id } = useParams();
  const member = useMemo(
    () => profileDatas.find((p) => p.id === id),
    [id, profileDatas]
  );
  profileDatas;
  return (
    <main className="mt-[80px] member-detail-page">
      <section className="text-center py-[40px] px-[40px] lg:px-[150px] w-full">
        <div className="pt-12 pb-20">
          {member ? (
            <>
              <h1 style={{ fontSize: "2.5rem" }}>
                {`STONE in ${
                  member.region
                }`}
              </h1>
              <MemberDetail member={member} />
            </>
          ) : (
            <h2>Member not found !!!</h2>
          )}
        </div>
      </section>
    </main>
  );
};

export default page;
