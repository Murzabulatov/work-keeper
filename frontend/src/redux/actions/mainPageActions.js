import * as ACTIONS_TYPES from './actionTypes'


const MAIN_USER = (userInfo) => {
  return {
    type: ACTIONS_TYPES.MAIN_USER,
    payload: userInfo
  }
};

const MAIN_DEPARTMENTS = (orgID, departments) => {
  return {
    type: ACTIONS_TYPES.MAIN_DEPARTMENTS,
    payload: {
      orgID, departments
    }
  }
};

// organization - ЭТО МАССИВ ОБЪЕКТОВ
const MAIN_CREATOR_DEPARTMENTS = (organization) => {
  return {
    type: ACTIONS_TYPES.MAIN_CREATOR_DEPARTMENTS,
    payload: {
      organization
    }
  }
};


// organization - ЭТО МАССИВ ОБЪЕКТОВ
const MAIN_ORGANIZATIONS = (organization) => {
  return {
    type: ACTIONS_TYPES.MAIN_ORGANIZATIONS,
    payload: {
      organization
    }
  }
};




export {
  MAIN_USER,
  MAIN_DEPARTMENTS,
  MAIN_ORGANIZATIONS,
  MAIN_CREATOR_DEPARTMENTS
} 
