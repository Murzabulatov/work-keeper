import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ACTION_MAIN_PAGE from "../../redux/actions/mainPageActions";
import CreatorContext from '../contexts/creatorContext';
import OrganizationCard from '../OrganizationCard';


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
          console.log(userInfo);


          if (departments.length) {
            const { orgID, name: orgName } = departments[0].organization

            setCreator(false)
            dispatch(ACTION_MAIN_PAGE.MAIN_DEPARTMENTS(orgID, departments))

            setDep(departments);
            setOrgName(orgName)
          }

          setOrgArray(organization)
          setUserInfo(userInfo)
          dispatch(ACTION_MAIN_PAGE.MAIN_USER(userInfo))
          dispatch(ACTION_MAIN_PAGE.MAIN_CREATOR_DEPARTMENTS(organization))
          dispatch(ACTION_MAIN_PAGE.MAIN_ORGANIZATIONS(organization))
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
          {/* ОТОБРАЖЕНИЕ ОРГАНИЗАЦИЙ/ДЕПАРТАМЕНТОВ С СЕРВЕРНЫХ ДАННЫХ (не из редакс!) 
                >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                */}

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
                <p> Уважаемый {userInfo.name + ' ' + userInfo.surname}, Вы являетесь сотрудником организации: {orgName}</p>
                {/* ОТОБРАЖЕНИЕ ДЕПАРТМЕНТОВ С СЕРВЕРНЫХ ДАННЫХ (не из редакс!) 
                >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                */}
              </>
              : <p> Уважаемый {userInfo.name + ' ' + userInfo.surname}, подождите, пока Вас добавят в список сотрудников на сайте </p>
          }
        </>
      }
    </>
  )
}

export default MainPage
