import Cookies from "js-cookie";
import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    try {
      callback();
    } catch (err) {
      console.log({ err });
    }
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};

export const getRoles = () => {
  const roleCookie = Cookies.get("role");
  const isUser = roleCookie === "user";
  const isDoc = roleCookie === "doc";
  const isHcp = roleCookie === "hcp";

  return {
    isUser,
    isDoc,
    isHcp,
    role: roleCookie,
  };
};
