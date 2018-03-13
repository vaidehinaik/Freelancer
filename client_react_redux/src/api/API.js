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
      credentials: 'include',
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

export const doLogout = (payload) =>
    fetch(`${api}/users/logout`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: {username: payload.username}
    }).then(res => {
      return res;
    })
    .catch(error => {
      console.log("This is error in doSignup");
      return error;
    });

export const userInfo = (payload) =>
    fetch(`${api}/users/userinfo`, {
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
      console.log("This is error in userInfo");
      return error;
    });

export const updateUserInfo = (payload) =>
    fetch(`${api}/users/updateuserinfo`, {
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
      console.log("This is error in update user info");
      return error;
    });

export const postProject = (payload) =>
    fetch(`${api}/projects/postproject`, {
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
        console.log("This is error in postproject");
        return error;
      });

export const allExceptUserProjects = (payload) =>
    fetch(`${api}/projects/allexceptuserprojects`, {
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
        console.log("This is error in allExceptUserProjects");
        return error;
      });

  export const userProjects = (payload) =>
      fetch(`${api}/projects/userprojects`, {
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
          console.log("This is error in allExceptUserProjects");
          return error;
      });
