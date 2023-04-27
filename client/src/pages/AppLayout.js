import {
  useState,
} from "react";
import {
  Switch,
  Route,
} from "react-router-dom";

import usePlanets from "../hooks/usePlanets";
import useLaunches from "../hooks/useLaunches";

import Header from "../components/Header";
import Footer from "../components/Footer";

import Launch from "./Launch";
import History from "./History";
import Upcoming from "./Upcoming";

const AppLayout = props => {

  const [frameVisible, setFrameVisible] = useState(true);
  const animateFrame = () => {
    if (frameVisible) {
      setFrameVisible(false);
    }
 
    setTimeout(() => {
      setFrameVisible(true);
    }, 600);
  };

  const onSuccessSound = () => {};
  const onAbortSound = () => {};
  const onFailureSound = () => {};

  const {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
  } = useLaunches(onSuccessSound, onAbortSound, onFailureSound);

  const planets = usePlanets();
  
  return <div>
    <Header onNav={animateFrame} />
    <div style={{margin: '0 auto', width: '1000px'}}>
        <div style={{padding: "20px"}}>
          <Switch>
            <Route exact path="/">
              <Launch 
                planets={planets}
                submitLaunch={submitLaunch}
                isPendingLaunch={isPendingLaunch} />
            </Route>
            <Route exact path="/launch">
              <Launch
                planets={planets}
                submitLaunch={submitLaunch}
                isPendingLaunch={isPendingLaunch} />
            </Route>
            <Route exact path="/upcoming">
              <Upcoming
                launches={launches}
                abortLaunch={abortLaunch} />
            </Route>
            <Route exact path="/history">
              <History launches={launches} />
            </Route>
          </Switch>
        </div>
    </div>
    <Footer />
  </div>;
};

export default AppLayout;