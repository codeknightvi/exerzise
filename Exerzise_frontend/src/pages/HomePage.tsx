import Navbar from "../components/Navbar";
import Bars from "../components/Bars";
import Body1 from "../components/Body1";
import FGrid from "../components/FGrid";
import Footer from "../components/Footer";
import Testomonials from "../components/Testomonials";
import Benefits from "../components/Benefits";
import { ActivitiesBox } from "../components/ActivitiesBox";
import Gallery from "../components/Gallery";
import HomeCover from "../components/HomeCover";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HomeCover />

      <div className="md:mt-[150px] relative">
        <Body1 />
        <div className="static md:absolute -top-[270px] left-[50%] md:-translate-x-1/2 ">
          <Bars />
        </div>
      </div>

      <div className="my-5">
        <Benefits />
      </div>

      <div className="my-5">
        <Testomonials />
      </div>

      <div className="my-5">
        <h1 className="text-2xl text-center my-5">Gallery</h1>
        <Gallery />
      </div>

      <div className="my-5">
        <h1 className="text-2xl text-center my-5">Activities</h1>
        <ActivitiesBox />
      </div>

      <FGrid />
      <Footer />
    </>
  );
};

export default HomePage;
