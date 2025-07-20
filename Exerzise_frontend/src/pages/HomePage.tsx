import Navbar from "../components/Navbar";
import FGrid from "../components/FGrid";
import Footer from "../components/Footer";
import Testomonials from "../components/Testomonials";
import Benefits from "../components/Benefits";
import { ActivitiesBox } from "../components/ActivitiesBox";
import Gallery from "../components/Gallery";
import HomeCover from "../components/HomeCover";
import IncludedService from "../components/IncludedService";
import WhoWeAre from "../components/WhoAreWe";
import HomeHeader from "../components/HomeHeader";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HomeCover />

      <div className="md:mt-[150px] relative">
        <WhoWeAre />
        <div className="static md:absolute -top-[270px] left-[50%] md:-translate-x-1/2 ">
          <IncludedService />
        </div>
      </div>

      <div className="my-5">
        <HomeHeader text="Benefits" />
        <Benefits />
      </div>

      <div className="my-5">
        <HomeHeader text="Testomonials" />
        <Testomonials />
      </div>

      <div className="my-5">
        <HomeHeader text="Gallery" />
        <Gallery />
      </div>

      <div className="my-5">
        <HomeHeader text="Activities" />
        <ActivitiesBox />
      </div>

      <FGrid />
      <Footer />
    </>
  );
};

export default HomePage;
