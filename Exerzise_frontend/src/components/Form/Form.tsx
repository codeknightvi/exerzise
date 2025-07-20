import { getInitialFormObjects } from "../../function";
import { FormEvent, useEffect, useState } from "react";
import { BTN, Input, StyleForm } from "../styled";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/slices/userDataSlice";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../features/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setToken } from "../../features/slices/tokenSlice";
import { Formprops } from "../../interfaces/propTypes";
import { loginForm, registerform } from "../../../config/formConfig";

export const Form = ({ setPageState, pageState }: Formprops) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading: isUpdating }] = useLoginMutation();
  const [register] = useRegisterMutation();

  const formArr = pageState === "register" ? registerform : loginForm;
  const initialFormValue = getInitialFormObjects(formArr);
  const [formValue, setFormvalue] = useState(initialFormValue);

  useEffect(() => {
    setFormvalue(initialFormValue);
  }, [pageState, initialFormValue]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pageState === "login") {
      const resolveAfter3Sec = new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
      login(formValue)
        .unwrap()
        .then((loginResponse) => {
          console.log("loginResponse", loginResponse);
          dispatch(setUser(loginResponse.data));
          dispatch(setToken({ token: loginResponse._token }));
          toast
            .promise(resolveAfter3Sec, {
              pending: "Loggin In...",
              success: `${loginResponse.message} Welcome ${loginResponse.data.firstname} `,
              error: "Please Login Again",
            })
            .then(() => {
              navigate("/home");
            })
            .then(() => {
              // setTimeout(() => {
              //   toast.success(
              //     `${loginResponse.message} Welcome ${loginResponse.data.firstname}`
              //   );
              // }, 1);
            });
        })
        .catch((err) => {
          toast.error(err.data.message);
        });
    } else {
      register(formValue)
        .unwrap()
        .then((registerResponse) => {
          toast.success(`${registerResponse.message}`);
          setPageState("login");
        })
        .catch((err) => {
          toast.error(err.data.message);
        });
    }
  };

  return (
    <>
      {isUpdating ? (
        " "
      ) : (
        <StyleForm id={pageState} onSubmit={submitHandler}>
          <b className="p-4 text-3xl">{pageState.toUpperCase()}</b>
          {formArr.map((input, index) => (
            <Input
              // inputRef={formRef}
              id={input.name}
              placeholder={input.name}
              label={input.name}
              type={input.type}
              formValue={formValue}
              setFormvalue={setFormvalue}
              key={index}
            />
          ))}
          <div>
            <span>
              {pageState === "register"
                ? "I'm already a member"
                : "I'm new here"}
              <span
                onClick={() => {
                  setPageState(pageState === "register" ? "login" : "register");
                }}
              >
                <b>
                  <u> {pageState === "register" ? "Login" : "Register"}</u>
                </b>
              </span>
            </span>
          </div>
          <BTN type="submit">
            {pageState === "register" ? "Register" : "Login"}
          </BTN>
        </StyleForm>
      )}
    </>
  );
};
export default Form;
