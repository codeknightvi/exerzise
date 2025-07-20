import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { dayNames } from "../base";
import { useEffect, useState } from "react";
import { categorize } from "../function";
import CommonBtn from "../components/CommonBtn";
import TimePickerValue from "../components/TimePicker";
import CoachTimeContainer from "../components/CoachTimeContainer";

import dayjs from "dayjs";
import {
  useDeleteScheduleMutation,
  useGetCoachTimeQuery,
  usePostScheduleMutation,
} from "../features/api/apiSlice";
import { useAppSelector } from "../store";
import { TimeSelectedType } from "../interfaces";
import { toast } from "react-toastify";
import DayPicker from "../components/dayPicker";

const CoachSchedule = () => {
  const currentCoachId = useAppSelector((state) => state.user.userId);
  // post is => JSON.parse(localStorage.getItem("user")!).userId

  const [
    deleteSchedule,
    // { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useDeleteScheduleMutation();
  const { data, isLoading } = useGetCoachTimeQuery(
    JSON.parse(localStorage.getItem("user")!).userId
  );
  const [postSchedule] = usePostScheduleMutation();

  useEffect(() => {
    console.log("coach time data", data);
  }, []);

  const [dayAdded, setDayAdded] = useState(0);
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const currentDate = dayjs().add(dayAdded, "day").format("DD/MM/YYYY");
  const [timeSelected, setTimeSelected] = useState<TimeSelectedType[]>([]);
  const [timeStart, setTimeStart] = useState<string>(" ");
  const [timeEnd, setTimeEnd] = useState<string>(" ");
  // useEffect(() => {
  //   console.log("timeStart", timeStart);
  //   console.log("timeEnd", timeEnd);
  // }, [timeStart, timeEnd]);
  const clearThisDay = () => {
    console.log("clear");
  };

  return (
    <>
      <Navbar />
      <DayPicker
        currentDate={currentDate}
        currentDay={currentDay}
        setDayAdded={setDayAdded}
        setCurrentDay={setCurrentDay}
      />
      <div className="grid grid-cols-3 gap-2 w-1/5 mx-auto place-content-center justify-items-center"></div>
      <div className="flex gap-x-4 justify-center items-center">
        <TimePickerValue
          label={"Start Time"}
          val={timeStart}
          setVal={setTimeStart}
        />
        <div>-</div>
        <TimePickerValue label={"End Time"} val={timeEnd} setVal={setTimeEnd} />
      </div>
      {/* submit btn */}
      <div className="flex justify-center gap-x-2">
        {
          <CommonBtn
            placeholder={"Set Time"}
            onClick={() => {
              setTimeSelected((prev: TimeSelectedType[]) => {
                console.log("prev", prev);

                let result = [
                  ...prev,
                  {
                    day: currentDay,
                    date: currentDate,
                    availableTime: timeStart,
                    endofAvailableTime: timeEnd,
                  },
                ];
                console.log("categorize(result)", categorize(result));
                return categorize(result);
              });
              // timeSelectHandler(timeStart, timeEnd);
            }}
          />
        }
        {
          <CommonBtn
            placeholder={"submit"}
            onClick={() => {
              postSchedule({
                timeAvailable: timeSelected,
                coachId: currentCoachId,
              })
                .unwrap()
                .then((res: { message: string }) => {
                  toast.success(res.message);
                });
            }}
          />
        }
        {
          <CommonBtn
            placeholder={"clear"}
            onClick={() => {
              setTimeSelected([]);
              toast.success("Scehdule Cleared");
            }}
          />
        }
      </div>
      <div className="m-5 w-full text-center">Current Available Time</div>
      {isLoading ? (
        "loading"
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 mx-7 ">
          {data?.map((val, index: number) => (
            <div
              key={index}
              className="bg-red-200 p-4 flex flex-col items-center relative"
            >
              <div className="flex gap-x-1 ">
                <div className="">{dayNames[val.day]}</div>
                <div className="">{val.date}</div>
              </div>
              <div className="">
                {val.availableTime}-{val.endOfAvailableTime}
              </div>
              <button
                onClick={() => {
                  deleteSchedule({
                    coachId: currentCoachId,
                    day: val.day,
                  })
                    .unwrap()
                    .then((res: { message: string }) => {
                      toast.success(res.message);
                    })
                    .catch((err: { data: { message: string } }) => {
                      toast.warn(err.data.message);
                    });
                }}
                className="absolute text-white top-0 right-2 hover:text-slate-300"
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}
      <CoachTimeContainer
        data={timeSelected}
        setTimeSelected={setTimeSelected}
        header={"Alter Time"}
        fn={clearThisDay}
      />
      <Footer />
    </>
  );
};

export default CoachSchedule;
