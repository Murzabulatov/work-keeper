const initialState = () => {
  const initialValue = {
    aboutMe: {
      isCreator: true,
    },

    user: {},

    organizations: [],

    departments: {},

    department: {},

    workerDeps: []
  }

  return JSON.parse(localStorage.getItem('redux')) || initialValue

}


export default initialState


