import { useState } from "react";
import { activityTabs } from "../../constant/images";

export const ActivitiesBox = () => {
  const [displatedActivity, setDisplayedActivity] = useState(activityTabs[0]);

  return (
    <div className="flex flex-col w-[350px] md:flex-row justify-center h-[800px] md:h-[400px] md:w-[1000px] mx-auto my-10 md:my-0">
      <div className="w-full bg-slate-200 text-center p-4 relative z-3">
        <div className="tabs-container absolute flex justify-around gap-x-1 top-[-30px] left-[12%] md:top-0 md:flex-col md:left-[-30px] md:h-[400px] ">
          {activityTabs.slice(1, activityTabs.length).map((el, index) => (
            <div
              onClick={() => {
                setDisplayedActivity(el);
              }}
              key={index}
              className={`tab cursor-pointer flex items-start md:items-center h-[80px] w-[50px] hover:-translate-y-3 md:h-[50px] md:w-[100px] md:hover:-translate-x-12 md:hover:-translate-y-0 ${
                el.name === displatedActivity.name
                  ? "bg-red-200"
                  : "bg-slate-100"
              }`}
            >
              <img
                src={el.icon}
                alt={el.alt}
                className="h-[20px] mt-3 mx-4 md:mt-0"
              />
            </div>
          ))}
        </div>

        <div className="w-full h-full bg-red-200 p-4 relative">
          <header className="text-xl">{displatedActivity.name}</header>
          <div className="h-[200px] md:h-5/6 md:mt-4 bg-slate-200 overflow-hidden ">
            <img
              className="w-full object-cover hover:scale-125 transition duration-500 cursor-pointer"
              src={displatedActivity.img}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="w-full bg-red-200 text-center relative">
        <header className="p-4 md:p-10 h-[300px] ">
          {displatedActivity.content}
        </header>
      </div>
    </div>
  );
};
