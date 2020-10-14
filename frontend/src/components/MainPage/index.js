import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; import OrganizationCard from '../OrganizationCard';
import DepartmentCard from '../DepartmentCard';


const MainPage = () => {

  const userInfo = useSelector(state => state.user)
  const isCreator = useSelector(state => state.aboutMe.isCreator)
  const orgArray = useSelector(state => state.organizations)
  const dep = useSelector(state => state.workerDeps)

  return (
    <>
      <h1>Главная страница</h1>

      {isCreator
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
                <p> {userInfo.name + ' ' + userInfo.surname}, Вы являетесь сотрудником организации "{orgArray[0].name}"</p>
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
