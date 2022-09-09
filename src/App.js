import Axios from "axios";
import Cookies from "js-cookie";
import "./App.css";
import { AuthProvider } from "./context/auth";
import constants from "./util/constants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
// import AuthRoute from "./util/AuthRoute";
import Home from "./pages/home";
import MeetingRoom from "./pages/MeetingRoom";

// import { JitsiMeeting } from "@jitsi/react-sdk";

const token = Cookies.get("token");
// console.log({ token });
Axios.defaults.baseURL = constants.baseURL;
Axios.defaults.withCredentials = true;
Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/room/:id/:type" element={<MeetingRoom />} />
          {/* <AuthRoute exact path="/register" component={Register} /> */}
          {/* <Route exact path="/posts/:postId" component={SinglePost} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
