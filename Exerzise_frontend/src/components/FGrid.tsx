import { gridContent } from "../../constant/content";

const FGrid = () => {
  return (
    <div className="grid grid-cols-4 ">
      {gridContent.map((el, index) => (
        <div key={index} className="grid grid-rows-2 h-[500px]">
          <div className={`grid-text ${index % 2 === 0 && "order-last"}`}>
            <div className="text-2xl">{el.header}</div>
            <div>{el.content}</div>
          </div>
          <div className="overflow-hidden h-full">
            <img className="object-cover w-full h-full" src={el.bg} alt="" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FGrid;
