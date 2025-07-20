import { useEffect, useState } from "react";

import "reactjs-popup/dist/index.css";
import {
  useGetBookingsQuery,
  useUpdateCommentMutation,
} from "../features/api/apiSlice";
import { BookingDataResponse } from "../interfaces";
import CompleteBookingPopup from "./../components/Popup_Complete";
import Blank from "./Blank";
import StatusPopup from "./Popup_Status";
import { useAppSelector } from "../store";
import { statusBackground, statusButton } from "../../config/status";
import { getExpired } from "../function";
export interface bookingProps {
  expired?: boolean;
  cancel?: boolean;
}
const Booking = ({ expired, cancel }: bookingProps) => {
  const user = useAppSelector((state) => state.user);
  const [starValue, setStarValue] = useState<number>(3);
  const [thisBooking, setThisbooking] = useState<string>(" ");
  const [commentText, setCommentText] = useState<string>(" ");
  const [show, setShow] = useState(false);
  const [
    updateComment,
    // { isLoading: updating }, // This is the destructured mutation result
  ] = useUpdateCommentMutation();
  const { data, isLoading } = useGetBookingsQuery({
    userId: user.userId,
    // userId: localStorage.getItem("user")
    //   ? JSON.parse(localStorage.getItem("user")!).userId
    //   : null,
    allDone: false,
  });

  const displayData =
    data && !expired && !cancel
      ? data?.filter((el) => getExpired(el.date, el, true))
      : cancel
      ? data?.filter((el) => {
          return el.userStatus === "cancel" || el.coachStatus === "cancel";
        })
      : expired
      ? data?.filter((el) => getExpired(el.date, el, false))
      : null;
  useEffect(() => {}, [data]);

  return (
    <>
      {isLoading ? (
        "loading"
      ) : displayData && displayData.length !== 0 ? (
        <div className="grid grid-cols-1 relative">
          {displayData.map((bk: BookingDataResponse, index: number) => (
            <div
              key={index}
              className="flex justify-center flex-col md:flex-row m-4"
            >
              <div className="bg-red-200 relative p-4 object-cover overflow-hidden flex justify-center md:w-[30%]">
                <img
                  className="hover:scale-150 md:hover:scale-125 transition duration-500 cursor-pointer  "
                  src={`${
                    user.role === "user"
                      ? bk.coachImage
                      : user.role === "coach"
                      ? bk.userImage
                      : "https://library.sportingnews.com/styles/crop_style_16_9_desktop_webp/s3/2023-06/nba-plain--e3aafb30-bbd5-43a5-bbb0-464f1433b74d.jpeg.webp"
                  }`}
                  alt={user.role === "user" ? "coach profile" : "user profile"}
                />
                <div className="absolute text-red-500 bottom-3 text-md md:text-3xl m-1 md:m-3">
                  <div>
                    {user.role === "user"
                      ? `Coach ${bk.coachFirstName} ${bk.coachLastName}`
                      : `User ${bk.userFirstName} ${bk.userLastName}`}
                  </div>
                  {user.role === "user" ? `#${bk.coachId}` : `#${bk.userId}`}
                </div>
              </div>
              <div className="bg-slate-200 p-4 flex flex-col items-start justify-between relative z-2 ">
                <div className="flex align-center w-full justify-around">
                  <div
                    className={`self-end text-3xl p-3 ${
                      statusBackground.some(
                        (colo) => colo.name === bk.coachStatus
                      )
                        ? statusBackground.find(
                            (colo) => colo.name === bk.coachStatus
                          )?.color
                        : null
                    }`}
                  >
                    <div className="flex gap-2">
                      <div> Coach Status:</div>
                      <div> {bk.coachStatus}</div>
                    </div>
                  </div>
                  <div
                    className={`self-end text-3xl p-3 ${
                      statusBackground.some(
                        (colo) => colo.name === bk.userStatus
                      )
                        ? statusBackground.find(
                            (colo) => colo.name === bk.userStatus
                          )?.color
                        : null
                    }`}
                  >
                    <div className="flex gap-2">
                      <div> User Status:</div>
                      <div> {bk.userStatus}</div>
                    </div>
                  </div>
                </div>

                {/* content */}
                <div className="h-full mx-4 my-2">
                  <div>Date: {bk.date}</div>
                  <div>
                    time: {bk.timeFrom} - {bk.timeTo}
                  </div>
                  <div>Session: {bk.session === null ? " - " : bk.session}</div>
                  <div>Booking ID: {bk.bookingId}</div>
                  {user.role === "user" ? (
                    <div>Coach Phone Number: {bk.coachPhoneNumber}</div>
                  ) : (
                    <div>User Phone Number: {bk.userPhoneNumber}</div>
                  )}{" "}
                  {/* <div>Location:</div> */}
                </div>
                <div className="self-end text-2xl m-4">$ {bk.price}</div>
                <div className="grid grid-cols-2 gap-y-1 md:flex items-center justify-center self-center">
                  {statusButton.map((status, index) => (
                    <StatusPopup
                      key={index}
                      status={status}
                      bookingId={bk.bookingId}
                      // refetch={refetch}
                      // setShowStatus={setShowStatus}
                      // showStatus={showStatus}
                    />
                  ))}
                  {/* popup btn */}
                  <button
                    type="button"
                    className="button p-3 mx-2 hover:bg-white transition duration-500"
                    onClick={() => {
                      setThisbooking(bk.bookingId);
                      setShow((o) => !o);
                    }}
                  >
                    {bk.bookingId}
                  </button>
                  <CompleteBookingPopup
                    // refetch={refetch}
                    show={show}
                    setShow={setShow}
                    // bookingId={bk.bookingId}
                    thisBooking={thisBooking}
                    starValue={starValue}
                    commentText={commentText}
                    setStarValue={setStarValue}
                    setCommentText={setCommentText}
                    updateComment={updateComment}
                    bookingId={""}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Blank />
      )}
    </>
  );
};

export default Booking;
