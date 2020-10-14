const initialState = () => {
  const initialValue = {
    aboutMe: {
      isMe: false,
    },

    user: {},

    organizations: [],

    departments: {},

    department: {}
  }

  return JSON.parse(localStorage.getItem('redux')) || initialValue

}


export default initialState


