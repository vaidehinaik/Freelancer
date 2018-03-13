const initialState = {
    name: '',
    token: '',
    username: '',
    skills: [],
    contact: '',
    aboutMe: '',
    userinfo: {},
    projects: [],
    userProjects: []
}

const reducers = (state = initialState, action) => {
  switch(action.type) {
    case "USERNAME":
        state={
          ...state,
          username: action.payload.username,
          token: action.payload.token
        };
    break;

    case "USERINFO":
        state={
          ...state,
          userinfo: action.payload.userinfo
        };
    break;

    case "RESET":
        state={
            name: '',
            username: '',
            skills: [],
            contact: '',
            aboutMe: '',
            userinfo: {},
            projects: [],
            userProjects: []
        };
    break;

    default:
      break;
  }
  return state;
};

export default reducers;
