const initialState = {
    name: '',
    userid: '',
    username: '',
    skills: '',
    contact: '',
    aboutMe: '',
    projects: []
}

const reducers = (state = initialState, action) => {
  switch(action.type) {
    case "USERNAME":
        state={
          ...state,
          username: action.payload.username
        };
    break;

    default:
      break;
  }
  return state;
};

export default reducers;
