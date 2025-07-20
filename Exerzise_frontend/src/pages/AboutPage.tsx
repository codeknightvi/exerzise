import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeaderCover from "../components/PageHeaderCover";
import WhoWeAre from "../components/WhoAreWe";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <PageHeaderCover
        header={"About"}
        background={
          "https://www.transparentpng.com/download/sports/yzYTPJ-multi-sport-program-pictures-png-images-pngio.png"
        }
      />
      <WhoWeAre />
      <Footer />
    </>
  );
};

export default AboutPage;
