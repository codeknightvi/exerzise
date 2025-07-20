import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeaderCover from "../components/PageHeaderCover";
import { pageHeaders } from "../../constant/pageHeaders";

const ClassPage = () => {
  return (
    <>
      <Navbar />
      <PageHeaderCover
        header={pageHeaders["classes"].header}
        background={pageHeaders["classes"].background}
      />
      <div className="text-center text-[100px]">"Coming Soon...."</div>
      <Footer />
    </>
  );
};

export default ClassPage;
