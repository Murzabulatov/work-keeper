import React, { useContext, useState } from 'react';
import ModalOrg from './ModalOrg';
import Button from '@material-ui/core/Button';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OrganizationCard from '../OrganizationCard';
import CreatorContext from '../contexts/creatorContext';

const Profile = () => {

  console.log('RENDER profile');
  // const { id } = useParams()

  const orgArray = useSelector(state => state.organizations)
  const [open, setOpen] = useState(false);
  const { creator, setCreator } = useContext(CreatorContext); // CONTEXT

  console.log(creator, '<<<<<CREATOR');

  const depsObj = useSelector(state => state.departments)
  const userInfo = useSelector(state => state.user)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {creator
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
            Object.keys(depsObj)
              ?
              <>
                <p> Уважаемый {userInfo.name + ' ' + userInfo.surname}, здесь перечислены департаменты, в которых Вы состоите: </p>
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

export default Profile;
