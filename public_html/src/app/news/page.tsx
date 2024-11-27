"use client";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [news, setNews] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const handelFetchApi = async () => {
      try {
        const response = await fetch(`http://localhost:1968/news`);
        const data = await response.json();
        const dataB = data.sort(
          (a: any, b: any) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
        setNews(dataB);

        console.log(data);
      } catch (error) {
        //
      }
    };
    handelFetchApi();
  }, []);
  const formatDate = (dateString: any) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    } as any;
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", options).toUpperCase();
  };
  const render = (image: any) => {
    let imageUrl = image.startsWith("http://localhost:1968/")
      ? image.replace("http://localhost:1968/", "")
      : image;
  
    if (!imageUrl.startsWith("http://localhost:1968/")) {
      imageUrl = "http://localhost:1968/" + imageUrl;
    }
  
    return imageUrl
  }
  
  return (
    <div>
      <div className="bg-white mb-5">
        <header className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <img
              src="/images/logo/blue.webp"
              alt="Company Logo"
              className="mr-2 w-[140px]"
            />
          </div>
          <nav className="flex space-x-4">
            <a href="#" className="text-[#0419DC] font-medium">
              About us
            </a>
            <a href="#" className="text-[#0419DC] font-medium">
              Our service
            </a>
            <a href="#" className="text-[#0419DC] font-medium">
              Franchise Program
            </a>
            <a href="#" className="text-gray-700">
              Blog/News
            </a>
            <a href="#" className="text-[#0419DC] font-medium">
              Contacts
            </a>
            <a href="#" className="text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 15.75L19.5 19.5M10.5 17.25A6.75 6.75 0 1010.5 3.75a6.75 6.75 0 000 13.5z"
                />
              </svg>
            </a>
          </nav>
        </header>
        <main>
          <section className="text-center py-8">
            <h1 className="text-6xl font-bold text-blue-600">NEWS</h1>
            <p className="text-gray-500 mt-2">MONDAY | DECEMBER 19, 2022</p>
          </section>
          <section className="relative">
            <img
              src={news?.[0]?.image ? render(news?.[0]?.image):"/image.png"}
              alt="Main News Image"
              className=" w-[1920px] h-[492px]"
            />
            <div className="absolute  inset-0  flex flex-col justify-center items-center text-white p-4">
              <h2 className="text-4xl font-bold absolute bottom-[160px]">
                {news?.[0]?.title}
              </h2>

              <p className="mt-4 absolute bottom-[100px] pl-3 ">
                The called object, which has flown Montana to Kansas, an
                "intelligence <br /> gathering" balloon. Beijing said it was
                used mainly for weather research and had strayed off course.
              </p>
            </div>
          </section>
          <section className="bg-gray-300 text-left py-4 mt-12">
            <p className="text-black font-bold text-lg">
              Red's values of kindness, freedom, responsibility, and
              multiculturalism. You'll connect with diverse cultures
            </p>
          </section>
          <section className="p-8 mx-24">
            <div className="flex justify-start space-x-4 mb-4 border-b border-[#222222] w-[570px]">
              <a
                href="#"
                className="text-white px-2 border-b-2 bg-slate-700 border-blue-600"
              >
                LOREM
              </a>
              <a href="#" className="text-gray-700">
                LOREM
              </a>
              <a href="#" className="text-gray-700">
                LOREM
              </a>
              <a href="#" className="text-gray-700">
                LOREM
              </a>
              <a href="#" className="text-gray-700">
                LOREM
              </a>
            </div>
            <div className="grid grid-cols-4 gap-4 my-[61px]">
              {news?.map((items: any, index: number) => (
                <div
                  onClick={() => router.push(`/news/${items?._id}`)}
                  key={items?._id}
                  className="bg-white p-4  "
                >
                  <div className="flex justify-center items-center">
                    <img
                      src={`http://localhost:1968/${items?.image}`}
                      alt="News Image 1"
                      className="w-[364px] h-[205px] mb-4 block"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{items?.title}</h3>
                  <p className="text-gray-500 mt-2">
                    {formatDate(items?.createdAt)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <hr className="bg-black p-[1px]" />
            </div>
          </section>
          <div className="flex items-center justify-center space-x-4 mt-10">
            <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <span className="text-red-500">1</span>
            <span className="text-gray-500">2</span>
            <span className="text-gray-500">3</span>
            <span className="text-gray-500">...</span>
            <span className="text-gray-500">32</span>
            <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default page;
