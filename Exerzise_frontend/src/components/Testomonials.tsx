import { useState } from "react";
import { testomonialsContent } from "../../constant/content";

const Testomonials = () => {
  const [val, setVal] = useState(0);
  const carouselDirectionHandler = (direction: "+" | "-") => {
    if (direction === "+") {
      setVal((prev) => prev + 1);
      if (val >= testomonialsContent.length - 1) {
        setVal(0);
      }
    }
    if (direction === "-") {
      setVal((prev) => prev - 1);
      if (val <= 0) {
        setVal(testomonialsContent.length - 1);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="my-10 relative flex p-10 border-solid border-8 border-[#D8D8D8] bg-red-100 items-end h-[350px]">
        <img
          className="h-[350px] hidden md:block"
          src={testomonialsContent[val].userImage}
        />

        <div className="flex flex-col justify-between w-[400px] h-full bg-red-200 p-6">
          <div className="h-full text-wrap break-words italic	">
            {testomonialsContent[val].content}
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="font-semibold">
                {testomonialsContent[val].user}
              </div>
              <div className="font-normal">{testomonialsContent[val].role}</div>
            </div>

            <div className="flex gap-x-3">
              <button
                className="py-2.5 px-3 bg-slate-200 hover:bg-slate-100"
                onClick={() => {
                  carouselDirectionHandler("-");
                }}
              >
                {"<"}
              </button>
              <button
                className="py-2.5 px-3 bg-slate-200 hover:bg-slate-100"
                onClick={() => {
                  carouselDirectionHandler("+");
                }}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testomonials;
