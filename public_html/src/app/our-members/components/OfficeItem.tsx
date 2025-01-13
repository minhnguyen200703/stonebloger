import { Office } from "@/constant/data/office";
import { Flex, Image } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";
import ShinyButton from '@/components/shiny-button';
import Link from "next/link";
type OfficeItemProps = {
    office: Office;
};

const OfficeItem = ({ office }: OfficeItemProps) => {
    return (
        <div className="w-full flex justify-center">
            <div className="w-5/6">
                <ShinyButton className="w-full" style={{ paddingTop: '0rem', paddingBottom: '0rem', marginBottom: '0.5rem', borderRadius: '50px'}}>
                    <div className="w-full text-white font-bold py-2 px-4 text-center">
                        {office.region}
                    </div>
                </ShinyButton>

                <Flex
                    key={office.id}
                    gap={15}
                    className="flex flex-col items-left bg-gray-100 rounded-2xl overflow-hidden shadow-lg text-left"
                >
                    <div className="p-4 px-10 text-left">
                        <h3 className="text-lg font-bold mb-2">{office.name}</h3>
                        <div className="text-base mb-2"><strong>E.</strong> {office.email}</div>
                        <div className="text-base mb-2"><strong>A.</strong> {office.address}</div>
                    </div>
                </Flex>
            </div>
        </div>
    );
};
export default OfficeItem;
