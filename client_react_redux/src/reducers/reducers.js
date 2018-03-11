const initialState = {
    name: '',
    username: '',
    skills: [],
    contact: '',
    aboutMe: '',
    projects: [],
    userProjects: []
}

const reducers = (state = initialState, action) => {
  switch(action.type) {
    case "USERNAME":
        state={
          ...state,
          username: action.payload.username
        };
    break;

    case "RESET":
        state=null;
    break;

    default:
      break;
  }
  return state;
};

export default reducers;
