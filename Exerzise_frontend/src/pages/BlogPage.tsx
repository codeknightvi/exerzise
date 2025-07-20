import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SearchBar } from "../components/SearchBar";
import PageHeaderCover from "../components/PageHeaderCover";
import Blogs from "../components/Blogs";
import BlogCategories from "../components/BlogCategories";
import { ChangeEvent, useState } from "react";
import { pageHeaders } from "../../constant/pageHeaders";

const AboutPage = () => {
  const [_searchInput, setSearchInput] = useState<string>("");

  const data = [
    {
      header: "Voluptate exercitation sit sit laboris ut magna ",
      content:
        "Sunt sit elit culpa pariatur sint duis fugiat deserunt proident ipsum cupidatat sit. Quis reprehenderit occaecat esse sit amet esse nisi magna nisi incididunt labore labore in minim. Sunt Lorem ipsum ea labore ullamco ullamco quis dolore labore. Adipisicing pariatur ullamco occaecat aliquip laboris. Ad occaecat ad non incididunt nisi culpa nostrud sint minim.",
      author: "admin",
      date: "12/12/12",
      category: "boxing",
      cover: "",
    },
  ];
  const searchHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchInput(value);
  };

  // const multipleData = Array.from({ length: 5 }, () => data);
  return (
    <>
      <Navbar />
      <PageHeaderCover
        header={pageHeaders["blog"].header}
        background={pageHeaders["blog"].background}
      />
      <div className="flex flex-col md:flex-row md:w-1/2 items-center md:items-start mx-auto gap-x-3 ">
        <Blogs data={data} />
        <div className="p-5 flex flex-col w-1/2 bg-slate-200 h-100 order-first md:order-last">
          <SearchBar placeholder={"search for blog"} handler={searchHandler} />
          <BlogCategories categories={data} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
