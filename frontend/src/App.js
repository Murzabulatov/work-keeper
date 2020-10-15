import React, { useEffect, useState } from 'react';
import './App.css';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage/LoginPage';
import PrivateRoute from './components/Private/Private';


import { Route, Switch, Redirect } from 'react-router-dom'
import SignIn from "./components/SignIn";
import Room from "./components/Room/Room";

import { useDispatch, useSelector } from 'react-redux';
import Profile from './components/Profile';
import LeftMenu from './components/Navbar/Navbar';
import MainPage from './components/MainPage'
import OrganizationInfo from './components/OrganizationInfo';
import DepartmentInfo from "./components/DepartmentInfo";
import WorkerInfo from './components/WorkerInfo'
import * as ACTION_MAIN from "./redux/actions/mainPageActions";

function App() {

  const aboutMe = useSelector(state => state.aboutMe);
  const user = useSelector(state => state.user)

  const [loggedIn, setLoggedIn] = useState(false)
  console.log('RENDER APP^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', loggedIn);

  const dispatch = useDispatch()

  useEffect(() => {


    console.log('AAAAAAAAAA ZASHEL');
    (async () => {
      try {
        // КОСТЫЛЬ
        if (loggedIn !== false) {

          const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/organization/?userID=${user.userID}`)
          const result = await response.json()
          console.log('AAAAAAAAAA DOGBALLS');

          if (response.ok) {

            const { departments, organization, ...userInfo } = result;

            console.log(departments)

            if (!organization.length) {
              const orgObj = departments[0].organization
              const { _id: orgID, name: orgName } = orgObj

              dispatch(ACTION_MAIN.MAIN_IS_NOT_CREATOR(userInfo))

              dispatch(ACTION_MAIN.MAIN_USER(userInfo))
              dispatch(ACTION_MAIN.MAIN_DEPARTMENTS(orgID, departments))
              dispatch(ACTION_MAIN.MAIN_ORGANIZATIONS(orgObj))

              dispatch(ACTION_MAIN.BACK_WORKER_DEPS(departments))


              return;
            }

            dispatch(ACTION_MAIN.MAIN_USER(userInfo))
            dispatch(ACTION_MAIN.MAIN_CREATOR_DEPARTMENTS(organization))
            dispatch(ACTION_MAIN.MAIN_CREATOR_ORGANIZATIONS(organization))
          }

        }

      } catch (err) {
        // логику с setMessageBack как в ModalWorker COMPONENT
        console.log(err);
      }
    })();
  }, [loggedIn, ])

  return (
    <div className="App">

      <LeftMenu setLoggedIn={setLoggedIn}>

        <Switch>


          <Route exact path="/user/registration">
            <RegistrationPage setLoggedIn={setLoggedIn} />
          </Route>

          <Route exact path="/user/login">
            <LoginPage setLoggedIn={setLoggedIn} />
          </Route>


          <Route exact path="/organization/:id">
            <OrganizationInfo />
          </Route>

          <Route exact path="/worker/:id">
            <WorkerInfo />
          </Route>

          <Route exact path="/department/:id">
            <DepartmentInfo />
          </Route>


          <Route exact path='/videochat' component={Room} />

          <Route exact path='/global-chat' component={SignIn} />


          <PrivateRoute exact path={`/profile/:id`}>
            <Profile />
          </PrivateRoute>

          <Route exact path="/">
            {aboutMe.isMe ? <MainPage /> : <Redirect to="/user/login" />}
          </Route>



        </Switch>
      </LeftMenu>


    </div>
  );
}

export default App;
