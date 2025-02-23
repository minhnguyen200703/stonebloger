import "@/styles/base.css";
import "@/styles/members.css";
import OurMemberSection from "./components/OurMemberSection";
import OfficesSection from "./components/OfficesSection";

const page = () => {
  return (
    <main className="mt-[80px] member-page">
      <OurMemberSection />

      <OfficesSection />
    </main>
  );
};

export default page;
