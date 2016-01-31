export const LOGGED_IN = 'LOGGED_IN';
export const LOGGING_IN = 'LOGGING_IN';
export const LOGGED_OUT = 'LOGGED_OUT'
export const UNAUTHENTICATED = 'UNAUTHENTICATED';
export const UNAUTHORIZED = 'UNAUTHORIZED';

export function login(username, password) {
  return (dispatch) => {
    dispatch({type: LOGGING_IN, start: new Date()});
    fetch('https://www.google.dk').then(data=> {
      dispatch({type: LOGGED_IN, session: {username: 'august', date: new Date()}})
    });
  };
}

export function logout() {
  return {
    type: LOGGED_OUT
  }
}
