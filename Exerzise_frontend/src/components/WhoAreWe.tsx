import { bodyBuilder } from "../../constant/images";

const WhoWeAre = () => {
  return (
    <div className="body1 flex items-center justify-center static md:relative md:mt-[150px]">
      <div className="text-header ms-10 me-10">Who we are?</div>
      <div className="bg-black p-10 flex flex-col md:flex-row h-[400px] w-[800px] items-center">
        <div className="flex flex-col">
          <h1>Magna aliqua commodo ex culpa consequat incididunt</h1>
          <p>Lorem et consequat ad eu consequat veniam culpa duis.</p>
          <div>
            <p>Lorem et consequat ad eu consequat veniam culpa duis.</p>
            <p>Lorem et consequat ad eu consequat veniam culpa duis.</p>
          </div>
        </div>
        <div>
          <img
            className="w-[800px]"
            src={bodyBuilder.img}
            alt={bodyBuilder.alt}
          />
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
