import { barContent } from "../../constant/content";

const IncludedService = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center">
      {barContent.map((el, index) => (
        <div
          className="bar h-[300px] w-[400px] p-5 my-5 flex flex-col justify-center items-center mx-10"
          key={index}
        >
          <img className="h-20 w-20" src={el.icon} alt={el.name} />
          <div key={index} className="rounded-md">
            <h1 className="text-header">{el.name}</h1>
          </div>
          {el.content}
        </div>
      ))}
    </div>
  );
};

export default IncludedService;
