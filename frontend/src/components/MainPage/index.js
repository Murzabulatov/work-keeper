import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


import './style.scss'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const MainPage = () => {


  const classes = useStyles();
  const userInfo = useSelector(state => state.user)
  const isCreator = useSelector(state => state.aboutMe.isCreator)
  const orgArray = useSelector(state => state.organizations)
  const dep = useSelector(state => state.workerDeps)

  return (
    <div className="main-page">
      <h1>Главная страница</h1>

      {isCreator
        ?
        <>
          <p>Для добавления организаций перейдите в личный кабинет </p>
          <hr />
          <p>Ваши организации:</p>

          <div className="profile__page">
            {orgArray.length ?
              <>
                {orgArray.map((org) => {
                  return (
                    <Link to={`/organization/${org._id}`} key={org._id}>
                        <Card className={classes.root}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              alt="Contemplative Reptile"
                              height="180"
                              image="https://static.tildacdn.com/tild3639-3835-4237-b964-623565623163/MoscowCityofficerentals.png"
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                              <Typography style={{marginTop: 10}} gutterBottom variant="h5" component="h2">
                                {org.name}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                    </Link>
                  )
                })}
              </>
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
                <ul className="org-list ">
                  {dep.map((dep) => {
                    return (
                      <Link to={`/department/${dep._id}`} key={dep._id}>
                        <li className="dep-list-task">
                          {dep.name}
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
    </div>
  )
}

export default MainPage
