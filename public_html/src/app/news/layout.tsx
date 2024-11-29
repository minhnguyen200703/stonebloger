import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

interface NewLayoutProps {
	children: React.ReactNode;
}

const NewLayout: React.FC<NewLayoutProps> = ({ children }) => {
	return (
		<>
			<Navbar />
      {children}
      <Footer />
		</>
	);
};

export default NewLayout;
