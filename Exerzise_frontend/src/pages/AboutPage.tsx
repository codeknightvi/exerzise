import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeaderCover from "../components/PageHeaderCover";
import WhoWeAre from "../components/WhoAreWe";
import { pageHeaders } from "../../constant/pageHeaders";
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <PageHeaderCover
        header={pageHeaders["about"].header}
        background={pageHeaders["about"].background}
      />
      <WhoWeAre />
      <Footer />
    </>
  );
};

export default AboutPage;
