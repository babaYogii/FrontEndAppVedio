import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import ProctetedRoutes from "./Helper/ProtectedRoutes"
import Home from "./components/Home";
import CreateMeeting from "./components/CreateMeeting";
import Logout from "./components/Logout";
import Navbar from './components/Navbar'
import MyMeetings from "./components/MyMeetings";
import JoinRoom from "./components/JoinRoom";
import Profile from "./components/Profile";
import SafeGaurd from "./components/SafeGaurd";
import { createTheme,ThemeProvider } from "@mui/material";
import Main from "./components/Main";
import ErrorComponent from "./components/ErrorComponent";



function App() {

  const theme = createTheme({
    palette: {
        primary:{
            main: '#00A86B'
        },
        secondary: {
            main: '#fff',
        },
        
    },
});
  

  return (
    <div>

      <BrowserRouter>
      <ThemeProvider theme={theme}>
      <Navbar />
        <Routes>
          <Route element={<ProctetedRoutes />}>
            <Route element={<Profile/>} exact path="/profile" />
            <Route element={<CreateMeeting />} exact path="/createmeeting" />
            <Route element={<Main />} exact path="/main" />
            <Route element={<MyMeetings />} exact path="/MyMeetings" />
            <Route element={<Logout/>} exact path="/logout"/>
            <Route element={<JoinRoom  />} exact path="/joinnow" />
          </Route>

            <Route element={<Home  />} exact path="/" />
            <Route element={<SafeGaurd />} path="/room/:meetingUrl"/>
            <Route element={<Signup  />} exact path="/signup" /> 
            <Route element={<Signin  />} exact path="/signin" />
            <Route element={<ErrorComponent  />} exact path="*" />
           
        </Routes>
        </ThemeProvider>

      </BrowserRouter>
    </div>
  );
}



export default App;
