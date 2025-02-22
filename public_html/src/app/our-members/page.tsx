import { offices } from "@/constant/data/office";
import "@/styles/base.css";
import "@/styles/members.css";
import OfficeItem from "./components/OfficeItem";
import OurMemberSection from "./components/OurMemberSection";

const page = () => {
  return (
    <main className="mt-[80px] member-page">
      <OurMemberSection />

      <section
        id="associate-offices"
        className="text-center py-[40px] px-[40px] lg:px-[135px] w-full"
      >
        <h1 style={{ fontSize: "2.5rem" }}>Associate Offices</h1>
        <div className="pt-12">
          <div className="w-full members-grid grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {offices.map((m) => (
              <OfficeItem office={m} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
