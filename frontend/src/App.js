import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage/LoginPage';
import PrivateRoute from './components/Private/Private';


import { Route, Switch, Redirect } from 'react-router-dom'
import SignIn from "./components/SignIn";
import Room from "./components/Room/Room";

import {useDispatch, useSelector} from 'react-redux';
import Profile from './components/Profile';
import LeftMenu from './components/Navbar/Navbar';
import MainPage from './components/MainPage'
import OrganizationInfo from './components/OrganizationInfo';
import DepartmentInfo from "./components/DepartmentInfo";
import WorkerInfo from './components/WorkerInfo'
import CreatorContext from './components/contexts/creatorContext'
import * as ACTION_MAIN_PAGE from "./redux/actions/mainPageActions";

function App() {

  const [creator, setCreator] = useState(true)
  const aboutMe = useSelector(state => state.aboutMe);
  const user = useSelector(state => state.user)
  const organizations = useSelector(state => state.organizations)


  const dispatch = useDispatch()

  const [dep, setDep] = useState([])
  const [orgName, setOrgName] = useState('')
  const [userInfo, setUserInfo] = useState({})
  const [orgArray, setOrgArray] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/organization/?userID=${user.userID}`)
        const result = await response.json()

        if (response.ok) {

          const { departments, organization, ...userInfo } = result;
          setUserInfo(userInfo)


          if (!organization.length) {
            const orgObj = departments[0].organization
            const { _id: orgID, name: orgName } = orgObj

            setCreator(false)

            dispatch(ACTION_MAIN_PAGE.MAIN_USER(userInfo))
            dispatch(ACTION_MAIN_PAGE.MAIN_DEPARTMENTS(orgID, departments))
            dispatch(ACTION_MAIN_PAGE.MAIN_ORGANIZATIONS(orgObj))


            setDep(departments);
            return setOrgName(orgName)
          }

          setOrgArray(organization)
          dispatch(ACTION_MAIN_PAGE.MAIN_USER(userInfo))
          dispatch(ACTION_MAIN_PAGE.MAIN_CREATOR_DEPARTMENTS(organization))
          dispatch(ACTION_MAIN_PAGE.MAIN_CREATOR_ORGANIZATIONS(organization))
        }


      } catch (err) {
        // логику с setMessageBack как в ModalWorker COMPONENT
        console.log(err);
      }
    })();
  }, [])

  return (
    <div className="App">

      <CreatorContext.Provider value={{ creator, setCreator }}>

        <LeftMenu >

          <Switch>


            <Route exact path="/user/registration">
              <RegistrationPage />
            </Route>

            <Route exact path="/user/login">
              <LoginPage />
            </Route>


            <Route exact path="/organization/:id">
              <OrganizationInfo organizations={organizations} />
            </Route>

            <Route exact path="/worker/:id">
              <WorkerInfo organizations={organizations} />
            </Route>

            <Route exact path="/department/:id">
              <DepartmentInfo organizations={organizations} />
            </Route>


            <Route exact path='/videochat' component={Room} />

            <Route exact path='/global-chat' component={SignIn} />


            <PrivateRoute exact path={`/profile/:id`}>
              <Profile />
            </PrivateRoute>

            <Route exact path="/">
              {aboutMe.isMe ? <MainPage creator={creator} orgArray={orgArray} dep={dep} userInfo={userInfo} orgName={orgName} /> : <Redirect to="/user/registration" />}
            </Route>



          </Switch>
        </LeftMenu>


      </CreatorContext.Provider>
    </div>
  );
}

export default App;
