import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CoachCard from "../components/CoachCard";
import {
  convertByTimeType,
  getOverlappingMinutes,
} from "../function/extend_index";
// import DayPicker from "../components/DayPicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  useGetCoachSceduleByDayQuery,
  usePostBookingsMutation,
} from "../features/api/apiSlice";
import {
  selectCoachById,
  useGetAllCoachesQuery,
  useGetCoachQuery,
} from "../features/api/userApiSlice";
import { removeObjectValueDupe } from "../function";
import CommonBtn from "../components/CommonBtn";
import { CoachTimeResponse, ForUserBookingType } from "../interfaces";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useAppSelector } from "../store";

const CoachDetail = () => {
  const [postBookings] = usePostBookingsMutation();
  const [dayAdded, setDayAdded] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const currentDate = dayjs().add(dayAdded, "day").format("L");
  // console.log("dayAdded", dayAdded); repeat
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const { coachId } = useParams<string>();
  const { data } = useGetCoachQuery(coachId); //coach data
  const { isSuccess } = useGetAllCoachesQuery(null);
  const coach = useSelector((state) => selectCoachById(state, coachId));

  // schedule
  const [userChose, setUserChose] = useState<ForUserBookingType[]>([]);
  const {
    data: coachSceduleData,
    // error: coachSceduleError,
    isLoading: coachSceduleLoading,
    refetch,
  } = useGetCoachSceduleByDayQuery({
    coachId: coachId,
    date: currentDate,
    // .format("L")
  });
  const [scheduleDisplayData, setscheduleDisplayData] = useState<string[]>(
    coachSceduleData?.availableTime || null
    // coachSceduleData?.availableTime
  );
  const userId = useAppSelector((state) => state.user.userId);

  useEffect(() => {
    console.log("coach detail data", data);
  }, [data]);
  useEffect(() => {
    if (coachSceduleData) {
      setscheduleDisplayData(coachSceduleData.availableTime);
    }

    setUserChose([]);
  }, [currentDay, coachSceduleData]);
  // }, [currentDay]);

  useEffect(() => {
    setscheduleDisplayData((prev: string[]) => {
      // console.log("prev", prev);
      if (prev) {
        return prev.filter(
          (old: string) => !userChose.find((chosen) => old === chosen.timeFrom)
        );
      } else {
        return coachSceduleData;
      }
    });
  }, [userChose]); //why we need useEffect for this

  // create all free is time and filter by booking Time
  const confirmBookingHandler = () => {
    //problem is i cannot get promise response from the mutation
    if (userChose.length !== 0) {
      const resolveAfter3Sec = new Promise((resolve) => {
        setTimeout(resolve, 3000); //get true from responseData.success
      });
      postBookings({
        bookings: userChose,
        coachId: coachId,
      })
        .unwrap()
        .then((bookingResponse) => {
          toast
            .promise(resolveAfter3Sec, {
              pending: "We are booking, please wait",
              success: bookingResponse.message,
              error: "the Booking(s) has been rejected 🤯",
            })
            .then(() => {
              refetch();
            });
        })

        .catch((reject) => {
          toast.error(reject.data.message);
        });
    } else toast.warn("there is emthy bookings");
  };
  const timeSelectHandler = (time: string) => {
    setUserChose((prev) => {
      const { session } = coachSceduleData.data;

      // const { userId } = localStorage.getItem("user")!
      //   ? JSON.parse(localStorage.getItem("user")!)
      //   : "";
      const newTimeSelected: ForUserBookingType = {
        date: currentDate,
        day: currentDay,
        timeFrom: time,
        timeTo: convertByTimeType(time, 30),
        session: session, //joinable
        coachId: coachId,
        userId: userId,
        // price: coachInfo.price,
      };
      const result = [...prev, newTimeSelected];
      console.log("user chose", result);
      return removeObjectValueDupe(result, "timeFrom");
    });
    const timeArray = [
      ...userChose.map((time) => ({
        startTime: time.timeFrom,
        endTime: time.timeTo,
      })),
      {
        startTime: time,
        endTime: convertByTimeType(time, 30),
      },
    ];
    console.log("timeArray", timeArray);
    // for acculmulate price
    const priceRanges = coachSceduleData.data.map(
      (time: CoachTimeResponse) => ({
        start: time.availableTime,
        end: time.endOfAvailableTime,
        price: time.price,
      })
    );
    let total = 0;
    console.log("priceRanges", priceRanges);
    for (const timeRange of timeArray) {
      for (const priceRange of priceRanges) {
        const overlappingMinutes = getOverlappingMinutes(timeRange, priceRange);
        const overlappingHours = overlappingMinutes / 60;
        total += overlappingHours * priceRange.price;
      }
    }
    setTotalPrice(total);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center my-10">
        {/* <CoachCard coachData={data} />
         */}
        {isSuccess && <CoachCard key={coach.userId} userId={coach.userId} />}
        <div>
          {/* <DayPicker
            currentDate={currentDate}
            currentDay={currentDay}
            setDayAdded={setDayAdded}
            setCurrentDay={setCurrentDay}
          /> */}
          <div className="grid grid-cols-7 gap-3 ">
            {/*newly filtered with chosen original */}{" "}
            {coachSceduleLoading
              ? "loading......"
              : scheduleDisplayData?.map(
                  (
                    time: string,
                    index: number //map time available from date
                  ) => (
                    <button
                      key={index}
                      className="bg-red-200 hover:bg-red-100 p-4"
                      onClick={() => {
                        timeSelectHandler(time);
                      }}
                    >
                      {`${time}-${convertByTimeType(time, 30)}`}
                    </button>
                  )
                )}
          </div>
          <div className="my-3">
            <div className="mb-2">User Bookings</div>
            {/*chosen original filter */}
            <div className="grid grid-cols-7 gap-3 ">
              {userChose!.map((selectedTime, index) => (
                <button
                  key={index}
                  className="bg-red-200 hover:bg-red-100 p-4"
                  onClick={() => {
                    setUserChose((prev) =>
                      prev.filter((item) => item !== selectedTime)
                    );
                    setscheduleDisplayData((prev) => [
                      ...prev,
                      selectedTime.timeFrom,
                    ]);
                  }}
                >
                  {`${selectedTime.timeFrom}-${selectedTime.timeTo}`}
                </button>
              ))}
            </div>
            <p>price: ${totalPrice}</p>
            <div className="flex gap-x-2 justify-center">
              <CommonBtn
                placeholder={"Confirm Bookings"}
                onClick={confirmBookingHandler}
              />
              <CommonBtn
                placeholder={"Clear Bookings"}
                onClick={() => {
                  setUserChose([]);
                  setscheduleDisplayData(coachSceduleData.availableTime);
                  toast.success("Bookings Cleared!");
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CoachDetail;
//error times clicked to chose
