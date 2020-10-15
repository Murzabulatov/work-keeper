import * as ACTIONS_TYPES from '../../actions/actionTypes'



const IS_LOADING = (newTask) => ({
  type: ACTIONS_TYPES.IS_LOADING,
  payload: {}
})

const NOT_LOADING = (id) => ({
  type: ACTIONS_TYPES.NOT_LOADING,
  payload: {}
})





export {
  IS_LOADING,
  NOT_LOADING,
}
