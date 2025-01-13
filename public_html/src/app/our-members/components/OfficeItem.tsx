import { Office } from "@/constant/data/office";
import { Flex, Image } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
type OfficeItemProps = {
    office: Office;
};

const OfficeItem = ({ office }: OfficeItemProps) => {
    return (
        <Flex
            key={office.id}
            gap={15}
            className="flex flex-col items-center bg-gray-100 rounded-2xl overflow-hidden shadow-lg text-center"
        >
            <div className="w-full bg-gradient-to-r from-blue-400 to-blue-900 text-white font-bold py-2 px-4">
                {office.region}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{office.name}</h3>
                <div className="text-base mb-2">E. {office.email}</div>
                <div className="text-base mb-2">A. {office.address}</div>
            </div>
            <Flex>
                <Link
                    href={`/our-members/${office.id}`}
                    className="flex items-center justify-center mt-4 px-4 py-2 bg-white text-blue-900 border border-blue-900 rounded-full font-bold transition-colors duration-300 hover:bg-blue-900 hover:text-white"
                >
                    <h3 className="mr-2">Find Out More</h3>
                    <i className="bi bi-arrow-right text-lg"></i>
                </Link>
            </Flex>
        </Flex>

    );
};

export default OfficeItem;
