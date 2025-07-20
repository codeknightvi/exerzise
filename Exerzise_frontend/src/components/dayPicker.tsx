import { dayNames } from "../base";
import { DayPickerPropType } from "../interfaces/propTypes";

const DayPicker = ({
  currentDay,
  setCurrentDay,
  setDayAdded,
  currentDate,
}: DayPickerPropType) => {
  const thisDate = (
    <div className="flex flex-col">
      <div>{`${dayNames[currentDay]}`}</div>
      <div>{currentDate}</div>
      {/* <div>{`${dateDay}/${month}/${year}`}</div> */}
    </div>
  );

  const dayChangeHandler = (direction: "+" | "-") => {
    if (direction === "-") {
      setCurrentDay((prev: number) => prev - 1);
      setDayAdded((prev: number) => prev - 1);
      if (currentDay <= 0) {
        setCurrentDay(dayNames.length - 1);
      }
    }
    if (direction === "+") {
      setCurrentDay((prev: number) => prev + 1);
      setDayAdded((prev: number) => prev + 1);
      if (currentDay >= dayNames.length - 1) {
        setCurrentDay(0);
      }
    }
    // console.log("currentDay", currentDay);
    // console.log("thisDate", currentDate);
  };
  return (
    <div>
      <div className="flex justify-center text-center my-4">
        <button
          className="px-3 bg-slate-200"
          onClick={() => {
            dayChangeHandler("-");
          }}
        >
          L
        </button>
        <div className="mx-2 flex flex-col">{thisDate}</div>
        <button
          className="px-3 bg-slate-200"
          onClick={() => {
            dayChangeHandler("+");
          }}
        >
          R
        </button>
      </div>
    </div>
  );
};

export default DayPicker;
