import { Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom'
import ModalWorker from "./ModalWorker";
import * as ACTION_DEP_ACTUAL from "../../redux/actions/depActualActions";

import WorkersList from '../WorkersList';
import CreatorContext from "../contexts/creatorContext";

// ЧЕКНУТЬ ВСЁ
const DepartmentInfo = ({ organizations }) => {
  console.log('RENDER DepartmentInfo');

  const { id } = useParams()
  console.log('IDIDIDIDIDIID', id);
  const dispatch = useDispatch()

  const [dep, setDep] = useState({})

  const [addWorker, setAddWorker] = useState({})

  const [orgID, setOrgID] = useState('')
  const history = useHistory()
  const [open, setOpen] = useState(false);
  const [mesFromBack, setMesFromBack] = useState('');
  const { creator, setCreator } = useContext(CreatorContext); // CONTEXT


  const departments = useSelector(state => state.departments)

  const workersArr = useSelector(state => state.department.workers)
  console.log('workersArr', workersArr);

  // useEffect(() => {
  //   return (() => {
  //     dispatch(ACTION_DEP_ACTUAL.DEP_CLEAR_ACTUAL());
  //   })
  // }, [])

  useEffect(() => {
    console.log(organizations, '<<<<<<<<<<<organizations');
    console.log(id, '<<<<<<<<<<<ID');

    const { _id: orgID } = organizations.find(el => el.departments.find(element => element._id === id));
    if (orgID) {
      const foundDep = departments[orgID].find(el => el._id === id) // ТУТ БЫЛО ПРИСВОЕНИЕ, а не сравнение СУКА, и всё ломалось
      console.log(foundDep, '))))))))))))))))))))))FOUND DEp');
      setDep(foundDep);
      setOrgID(orgID)
      dispatch(ACTION_DEP_ACTUAL.DEP_ACTUAL(foundDep));
    }
  }, [addWorker])

  const backHandler = () => {
    history.goBack()
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <div>Страница отдела</div>
      { Object.keys(dep).length ?
        <div className="d-flex flex-column align-items-center">
          <h1>
            {dep.name}
          </h1>
          {creator ?
            <>
              <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                + Добавить сотрудника
              </Button>
              {mesFromBack &&
                <span style={{ color: "red !important", fontSize: "small" }}>{' ' + mesFromBack}</span>}

              {open && <ModalWorker open={open} handleClose={handleClose} {...dep} orgID={orgID} setAddWorker={setAddWorker} setMesFromBack={setMesFromBack} />}
            </>
            : ''}


          <div>
            <WorkersList workersArr={workersArr} mesFromBack={mesFromBack} />
          </div>

          <button onClick={backHandler} type="button" className="btn btn-primary mt-5">Back</button>

        </div>
        : null}

    </>
  )
}

export default DepartmentInfo
