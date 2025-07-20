// import "../form/Form.css";
import { SetStateAction, useState } from "react";
import styled from "styled-components";
import { InputFromType } from "../../interfaces";

export const StyledDiv = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`;

export const BTN = styled.button`
  background: #d8d8d8;
  color: black;
  cursor: pointer;
  margin-bottom: 0;
  text-transform: uppercase;
  width: 100%;
  border-radius: 5px;
  height: 35px;
  border-color: transparent;
  box-shadow: 0px;
  outline: none;
  transition: 0.15s;
  text-align: center;
  &:active {
    background-color: #f1ac15;
  }
`;

export const StyleForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 30px;
  width: 50%;
  margin: auto;
  margin-top: 5%;
  background-color: #e94823;
`;
// Styled Input
export const Input = ({
  id,
  // inputRef,
  placeholder,
  label = "label",
  type = "text",
  formValue,
  setFormvalue,
}: InputFromType) => {
  const [activeRole, setActiveRole] = useState("user");
  const roleValue = [{ name: "user" }, { name: "coach" }];
  // const [_value, _setValue] = useState("");

  const onSearchChange = (e: { target: { value: SetStateAction<string> } }) => {
    setFormvalue({ ...formValue, [id]: e.target.value }); // from use side
    console.log(formValue);
  };
  const selectHandler = (role: string) => {
    setFormvalue({ ...formValue, role: role });
    setActiveRole(role);

    console.log(formValue);
  };
  return (
    <StyledDiv>
      <b className="mx-1 text-center">
        {label === "role" && <h1 className="m-1">Register As?</h1>}
      </b>
      {type === "select" ? (
        <div className={activeRole === "user" ? "switch" : "gg switch"}>
          <div className="slider">
            {roleValue.map((el, index) => {
              return (
                <button
                  key={index}
                  className={` ${
                    activeRole === el.name ? "active" : "non-active"
                  } p-3`}
                  type="button"
                  onClick={() => {
                    selectHandler(el.name);
                  }}
                >
                  <span className="zzz">{el.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <input
          className="mx-1"
          id={id}
          type={type}
          onChange={onSearchChange}
          placeholder={placeholder}
          style={{ padding: "5px", width: "140%" }}
        />
      )}
    </StyledDiv>
  );
};
