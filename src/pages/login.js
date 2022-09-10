import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext, useState } from "react";
import Input from "../components/Input.component";
import { useAuthDispatch, useAuthState } from "../context/auth";
import { useForm } from "../util/hooks";
import { HiOutlineMail } from "react-icons/hi";
import { AiFillLock } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FaStethoscope } from "react-icons/fa";
import { FaBriefcaseMedical } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import Btn from "../components/Btn.component";
import Tap from "../components/Tapcomponent";
import Spacer from "../components/Spacer.component";
import logo from "../assets/logo.svg";
import virtual_meeting from "../assets/virtual_meeting.svg";
import doctor_nurse from "../assets/doctor_nurse.png";
import { getAllAppointments } from "../util/util-functions";

function Login(props) {
  // const [error, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useAuthDispatch();

  const state = useContext(useAuthState);

  let navigate = useNavigate();

  const { onChange, values } = useForm(() => {}, {
    email: "",
    password: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      dispatch("SET_LOADING", true);

      setLoading(true);
      const res = await Axios.post(auth, {
        email: values.email,
        password: values.password,
      });
      dispatch("SET_LOADING", false);

      // console.log({ data: res.data });
      setLoading(false);
      // if (values.email === "" || values.password === "") {
      //   setErrorMsg("Please fill all fields");
      //   // setErrors({});
      //   return;
      // }
      if (res.data.message === "wrong password") {
        setErrorMsg("wrong password");
        // setErrors({});
        return;
      } else if (res.data.message === "user not found") {
        setErrorMsg("user not found");
        // setErrors({
        //   msg: t.auth.err_msg.empty_input,
        // });
        return;
      } else if (res.data.message === "fill all fields") {
        setErrorMsg("user not found");
        // setErrors({
        //   msg: t.auth.err_msg.fill_all_fields,
        // });
        return;
      } else if (res.data.message === "failed") {
        setErrorMsg("user not found");
        // setErrors({
        //   msg: t.auth.err_msg.empty_input,
        // });
        return;
      }
      setErrorMsg("");

      Cookies.set("token", res.data.token);
      Cookies.set("role", role);
      dispatch(dispatchType, {
        userData:
          role === "user"
            ? res?.data.user
            : role === "doc"
            ? res?.data.doctor
            : res?.data.hcp,
        profile: res?.data,
        role,
        token: res.data.token,
      });
      getAllAppointments(role, dispatch, res?.data, res.data.token);

      navigate("/");

      // Cookies.set("role", logedInType);
      // console.log({ res });x
      // console.log({ logedIn_user: res.data });
      // router.back();
    } catch (err) {
      setLoading(false);
      // setErrors(err?.response?.data);
      console.log({ err });
      setErrorMsg(err.message);
    }
  };

  // const context = useContext(AuthContext);

  let role = "";
  let auth = "";
  let dispatchType = "";
  // let forgetPassword_req = "";
  switch (activeIndex) {
    case 0:
      dispatchType = "LOGIN_USER";
      auth = "/login";
      role = "user";
      // forgetPassword_req = "/user-request-new-password";
      break;
    case 1:
      dispatchType = "LOGIN_DOC";
      auth = "/doctor-login";
      role = "doc";
      // forgetPassword_req = "/doctor-request-new-password";
      break;
    case 2:
      dispatchType = "LOGIN_HCP";
      auth = "/hcp-login";
      role = "hcp";
      // forgetPassword_req = "/hcp-request-new-password";
      break;
    default:
      break;
  }

  const taps = [
    {
      icon: (
        <BsFillPersonFill className={activeIndex === 0 && "text-primary"} />
      ),
      text: "User",
    },
    {
      icon: <FaStethoscope className={activeIndex === 1 && "text-primary"} />,
      text: "Doctor",
    },
    {
      icon: (
        <FaBriefcaseMedical className={activeIndex === 2 && "text-primary"} />
      ),
      text: "HCP",
    },
  ];

  if (state?.authenticated) navigate("/");

  return (
    <div className=" w-full h-[100vh]  bg-primary overflow-hidden flex">
      <div className=" w-full xl:w-2/4  h-full  drop-shadow-md px-5 md:px-10 py-5 bg-white	">
        <img src={logo} alt="logo" className="w-16 h-16 object-contain  " />

        <div className="h-full  flex flex-col justify-center w-full  ">
          <p className="text-4xl w-96 font-bold">
            Welcome back <br /> to{" "}
            <span className="text-primary">SehaPracto</span>{" "}
          </p>
          <p className="my-5">Sign in to your account below.</p>

          <div className="   border-4 border-primary rounded-lg">
            <div className="bg-primary h-14 flex justify-between ">
              {taps.map((tap, n) => (
                <Tap
                  activeIndex={activeIndex}
                  text={tap.text}
                  icon={tap.icon}
                  isActive={activeIndex === n}
                  onClick={() => setActiveIndex(n)}
                />
              ))}
            </div>
            <div className="px-5 pt-5">
              <Input
                label="Email"
                type="email"
                name="email"
                icon={<HiOutlineMail className="text-gray-400" />}
                error={values.email.length === 0 && errorMsg}
                value={values.email}
                onChange={onChange}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                icon={<AiFillLock className="text-gray-400" />}
                error={values.password.length === 0 && errorMsg}
                value={values.password}
                onChange={onChange}
              />

              <Btn text="Login" onClick={submitForm} loading={loading} />
              {/* {errorMsg && (
                <p className="text-red-600 text-xl text-center  w-auto p-2 rounded-md bg-red-200 mt-5">
                  {errorMsg}
                </p>
              )} */}
              <Spacer spacing="mt-4" />
              {errorMsg && (
                <div
                  class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                  role="alert"
                >
                  <HiInformationCircle className="text-xl mr-4" />
                  <p className="font-medium ">{errorMsg}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden xl:flex items-center justify-center h-full w-1/2">
        <img
          src={virtual_meeting}
          alt="virtual_meeting"
          className="object-contain w-[300px] h-[300px] "
        />
        <img
          src={doctor_nurse}
          alt="virtual_meeting"
          className="object-contain w-[300px] h-[300px] "
        />
      </div>
    </div>
  );
}

export default Login;
