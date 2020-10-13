import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ACTION_MAIN_PAGE from "../../redux/actions/mainPageActions";
import CreatorContext from '../contexts/creatorContext';
import OrganizationCard from '../OrganizationCard';
import DepartmentCard from '../DepartmentCard';


const MainPage = () => {

  console.log('>>>>>>>>>>>>>>>>>>>>>MAINPAGE************');
  const { creator, setCreator } = useContext(CreatorContext);

  //console.log(setCreator(false), '<<<<<<<<<CONTEXT');
  //console.log(setCreator(), '<<<<<<<<<st');
  const dispatch = useDispatch()
  const { userID } = useSelector(state => state.user)

  const [dep, setDep] = useState([])
  const [orgName, setOrgName] = useState('')
  const [userInfo, setUserInfo] = useState({})
  const [orgArray, setOrgArray] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/organization/?userID=${userID}`)
        const result = await response.json()
        console.log('INFO_FOR_MAIN_PAGE', result);

        if (response.ok) {

          const { departments, organization, ...userInfo } = result;
          console.log(departments[0], '*********ORGAN');
          setUserInfo(userInfo)


          if (!organization.length) {
            const orgObj = departments[0].organization
            const { _id: orgID, name: orgName } = orgObj

            console.log(orgID, '<<<<<<<<<ORGID');
            console.log(orgObj, '<<<<<<<<<ORGOBJ');
            console.log(orgName, '<<<<<<<<<ORGNAME');
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
    <>
      <h1>Главная страница</h1>

      {creator
        ?
        <>
          <p>Для добавления организаций перейдите в личный кабинет </p>
          <hr />
          <p>Ваши организации:</p>

          <div className="profile__page">
            {orgArray.length
              ? <ul className="org-list ">
                {orgArray.map((org) => {
                  return (
                    <Link to={`/organization/${org._id}`} key={org._id}>
                      <li className="org-list-task">
                        <OrganizationCard {...org} />
                      </li>
                    </Link>
                  )
                })}
              </ul>
              : <p>Нет добавленных организаций</p>
            }
          </div>

        </>

        :

        <>
          {
            dep.length
              ?
              <>
                <p> {userInfo.name + ' ' + userInfo.surname}, Вы являетесь сотрудником организации "{orgName}"</p>
                {/* ОТОБРАЖЕНИЕ ДЕПАРТМЕНТОВ С СЕРВЕРНЫХ ДАННЫХ (не из редакс!) 
                >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                */}
                <ul className="org-list ">
                  {dep.map((dep) => {
                    return (
                      <Link to={`/department/${dep._id}`} key={dep._id}>
                        <li className="dep-list-task">
                          <DepartmentCard {...dep} />
                        </li>
                      </Link>
                    )
                  })}
                </ul>
              </>
              : <p> Уважаемый {userInfo.name + ' ' + userInfo.surname}, подождите, пока Вас добавят в список сотрудников на сайте </p>
          }
        </>
      }
    </>
  )
}

export default MainPage
