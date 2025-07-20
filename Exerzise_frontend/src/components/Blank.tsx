import { useAppSelector } from "../store";

import { Link } from "react-router-dom";

const Blank = () => {
  const user = useAppSelector((state) => state.user);

  return user.username !== "defaultusername" ? (
    <div className="h-[100vh] m-auto text-6xl text-center my-10">
      Please Book
    </div>
  ) : (
    <div className="text-center w-full">
      <Link className="h-[100vh] m-auto text-6xl my-10" to="/">
        Please <u className="hover:text-red-200">Register/Login</u>
      </Link>
    </div>
  );
};

export default Blank;
