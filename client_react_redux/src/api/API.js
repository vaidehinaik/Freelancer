const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
  'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/users/login`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => {
      return res;
    }).catch(error => {
      console.log("This is error in doLogin");
      return error;
    });

export const doSignup = (payload) =>
    fetch(`${api}/users/signup`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => {
      return res;
    })
    .catch(error => {
      console.log("This is error in doSignup");
      return error;
    });
