import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ACTION_MAIN_PAGE from "../../redux/actions/mainPageActions";
import CreatorContext from '../contexts/creatorContext';
import OrganizationCard from '../OrganizationCard';
import DepartmentCard from '../DepartmentCard';


const MainPage = ({creator, orgArray, dep, userInfo, orgName}) => {


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
