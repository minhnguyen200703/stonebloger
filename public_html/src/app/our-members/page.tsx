import { members } from "@/constant/data/members";
import "@/styles/base.css";
import "@/styles/members.css";
import MemberItem from "./components/MemberItem";

const page = () => {
  return (
    <main className="mt-[80px] member-page">
      <section className="text-center py-[40px] px-[40px] lg:px-[135px] w-full">
        <h1 style={{ fontSize: "2.5rem" }}>Members</h1>
        <div className="pt-12">
          <div className="w-full members-grid grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {members.map((m) => (
              <MemberItem member={m} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
