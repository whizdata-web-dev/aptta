import React from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Box } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import About from "./pages/About/About";
import Players from "./pages/Players/Players";
import Contact from "./pages/Contact/Contact";
import PlayerInfo from "./pages/Players/components/PlayerInfo";
import Result from "./pages/Result/Result";
import ResultContainer from "./pages/Result/container/ResultContainer";
import AnimatedLogin from "./pages/Login/login/AnimatedLogin";
import { AuthContext } from "./assets/utils/UserLoginContext";
import ScoreSheet from "./assets/utils/ScoreSheet";
import EntriesContainer from "./pages/Entries/container/EntriesContainer";


function App() {
  // useEffect(() => {
  //   localStorage.clear();
  // }, []);
  return (
    <AuthContext>
      <Navbar />

      <Box
        className='relative marginMobileOnly'
        sx={{ background: "rgba(0,0,0,0.85)" }}
      >
        <Box
          className='mx-auto w-full'
          style={{
            minHeight: "95vh",
            backgroundRepeat: "no-repeat",
          }}
        >

          <Box sx={{ marginBottom: "4rem" }}>
            <Switch>
              <Route path='/home' exact component={Home} />
              <Route path='/about' exact component={About} />
              <Route
                path='/entries/:entry'
                exact
                component={EntriesContainer}
              />
              <Route path='/players' exact component={Players} />
              {/* <Route path='/player/:id' exact component={PlayerInfo} /> */}
              <Route exact path='/result' component={Result} />
              <Route
                exact
                path='/result/:tournamentId'
                component={ResultContainer}
              />
              {/* <Route path='/table' exact component={ScoreSheet} /> */}
              <Route path='/contact' exact component={Contact} />
              <Route path='/login' exact>
                <AnimatedLogin />
              </Route>
              <Redirect from='/' to='/home' exact />
            </Switch>
          </Box>
        </Box>
        <Footer />
      </Box>
    </AuthContext>
  );
}

export default App;
