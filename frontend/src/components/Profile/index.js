import React, {useContext, useEffect, useState} from 'react';
import ModalOrg from './ModalOrg';
import Button from '@material-ui/core/Button';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OrganizationCard from '../OrganizationCard';
import CreatorContext from '../contexts/creatorContext';
import DepartmentCard from "../DepartmentCard";

const Profile = () => {

  console.log('RENDER profile');
  // const { id } = useParams()

  const orgArray = useSelector(state => state.organizations)
  const [open, setOpen] = useState(false);
  const { creator, setCreator } = useContext(CreatorContext); // CONTEXT
  const depsObj = useSelector(state => state.departments)
  const userInfo = useSelector(state => state.user)

  const depArray = useSelector(state => state.departments)



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(orgArray.map(el => el.creator === userInfo.userID), '<<<<<<<<<<')

  return (
    <>
      {creator || orgArray.map(el => el.creator === userInfo.userID)[0]
        ?
        <>
          <div className="profile__page">
            <h1>ЛИЧНЫЙ КАБИНЕТ</h1>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
              + Добавить организацию
        </Button>
            {open && <ModalOrg open={open} handleClose={handleClose} />}
          </div>

          <div>
            {orgArray.length ? <ul className="org-list ">
              {orgArray.map((org) => {
                return (
                  <Link to={`/organization/${org._id}`} key={org._id}>
                    <li className="org-list-task">
                      <OrganizationCard {...org} />
                    </li>
                  </Link>
                )
              })}
            </ul> : <p>Нет добавленных организаций</p>
            }
          </div>
        </>

        :

        <>
          {
            Object.keys(depsObj).length && orgArray.map(el => el.creator !== userInfo.userID) ?
              <>
                <p> {userInfo.name + ' ' + userInfo.surname}, Вы являетесь сотрудником организации "{orgArray[0].name}"</p>
                <ul className="org-list ">
                  {Object.values(depsObj).map(el => el.map((dep) => {
                    console.log(dep)
                    return (
                    <Link to={`/department/${dep._id}`} key={dep._id}>
                    <li className="dep-list-task">
                    <DepartmentCard {...dep} />
                    </li>
                    </Link>
                    )
                  }))}
                </ul>
              </>
              : <p> Уважаемый {userInfo.name + ' ' + userInfo.surname}, подождите, пока Вас добавят в список сотрудников на сайте </p>
          }
        </>
      }
    </>
  )
}

export default Profile;
