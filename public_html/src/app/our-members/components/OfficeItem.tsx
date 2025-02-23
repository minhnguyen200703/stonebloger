import { Office } from "@/constant/data/office";
import { Flex } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";
import ShinyButton from "@/components/shiny-button";
import { m } from "framer-motion";
type OfficeItemProps = {
  office: Office;
};

const OfficeItem = ({ office }: OfficeItemProps) => {
  return (
    <m.div
      // Khi mount, item sẽ bắt đầu với opacity=0 rồi tăng lên 1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // Khi unmount, item sẽ fade-out
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full flex justify-center">
        <div className="w-full">
          <ShinyButton
            className="w-full"
            style={{
              paddingTop: "0rem",
              paddingBottom: "0rem",
              marginBottom: "0.5rem",
              borderRadius: "50px",
            }}
          >
            <div className="w-full text-white font-bold py-2 px-4 text-center">
              {office.region}
            </div>
          </ShinyButton>

          <Flex
            gap={15}
            className="flex flex-col items-left bg-gray-100 rounded-2xl overflow-hidden shadow-lg text-left min-h-20"
          >
            <div className="p-4 px-10 text-left">
              <h3 className="text-lg font-bold mb-2">{office.name}</h3>
              {office.email && (
                <div className="text-base mb-2">
                  <strong>E.</strong> {office.email}
                </div>
              )}
              {office.address && (
                <div className="text-base mb-2">
                  <strong>A.</strong> {office.address}
                </div>
              )}
            </div>
          </Flex>
        </div>
      </div>
    </m.div>
  );
};
export default OfficeItem;
