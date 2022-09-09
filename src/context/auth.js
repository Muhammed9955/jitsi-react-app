import Axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import Cookie from "js-cookie";
import { getAllAppointments } from "../util/util-functions";

const StateContext = createContext({
  authenticated: false,
  userData: null,
  profile: null,
  role: null,
  token: null,
  appointments: null,
  loading: false,
});

const DispatchContext = createContext(null);

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN_USER":
      return {
        ...state,
        authenticated: true,
        userData: payload.userData,
        profile: payload.profile,
        role: "user",
      };
    case "LOGIN_DOC":
      return {
        ...state,
        authenticated: true,
        userData: payload.userData,
        profile: payload.profile,
        role: "doc",
      };
    case "LOGIN_HCP":
      return {
        ...state,
        authenticated: true,
        userData: payload.userData,
        profile: payload.profile,
        role: "hcp",
      };
    case "LOAD_USER":
      return {
        ...state,
        authenticated: true,
        userData: payload.userData,
        profile: payload.profile,
        role: payload.role,
        token: payload.token,
      };
    case "GET_APPOINTMENTS":
      return {
        ...state,
        appointments: payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: payload,
      };
    case "LOGOUT":
      return { ...state, authenticated: false, profile: null };
    default:
      throw new Error(`Unknow action type: ${type}`);
  }
};

export const AuthProvider = ({ children }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    authenticated: false,
    userData: null,
    profile: null,
    role: null,
    appointments: [],
    loading: false,
  });

  const dispatch = (type, payload) => defaultDispatch({ type, payload });

  useEffect(() => {
    async function loadUser() {
      try {
        dispatch("SET_LOADING", true);
        const token = Cookie.get("token");
        const roleCookie = Cookie.get("role");

        // console.log({ token });
        // console.log({ roleCookie });

        //get auth api
        let profile = "";
        switch (roleCookie) {
          case "doc":
            profile = "/doctor";
            break;
          case "hcp":
            profile = "/hcp";
            break;
          case "user":
            profile = "/user";
            break;
          default:
            profile = "/user";
            break;
        }

        const res = await Axios.get(profile);
        dispatch("SET_LOADING", false);

        // console.log({ LOAD_USER_RES: res });
        token !== undefined &&
          dispatch("LOAD_USER", {
            userData:
              roleCookie === "user"
                ? res?.data.user
                : roleCookie === "doc"
                ? res?.data.doctor
                : res?.data.hcp,
            profile: res?.data,
            role: roleCookie,
            token,
          });
        console.log({ res: res.data });
        getAllAppointments(roleCookie, dispatch, res?.data, token);
      } catch (err) {
        console.log({ err });
      }
      // finally {
      //   dispatch("STOP_LOADING");
      // }
    }
    loadUser();
  }, []);
  // console.log({ state });
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
