import { combineReducers } from 'redux'
import usersReducer from "./usersReducer";
import aboutMeReducer from "./aboutMeReducer";
import orgReducer from './orgReducer'
import depReducer from './depReducer'
import actualDepReducer from './actualDepReducer'

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

const appReducer = combineReducers({
  user: usersReducer,
  aboutMe: aboutMeReducer,
  organizations: orgReducer,
  departments: depReducer,
  department: actualDepReducer,
})

export default rootReducer
