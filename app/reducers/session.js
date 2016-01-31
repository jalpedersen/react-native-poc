import * as types from '../actions/session';

export default function auth(state={}, action={}) {
  switch (action.type) {
    case types.LOGGING_IN:
    return Object.assign({}, state, {loggingIn: true});

    case types.LOGGED_IN:
    return Object.assign({}, state, {user: action.session, loggingIn: false});

    case types.LOGGED_OUT:
    return Object.assign({}, state, {user: null, loggingIn: false});

    case types.UNAUTHORIZED:
    case types.UNAUTHENTICATED:
    let error = {error: action.type, message: action.message, loggingIn: false};
    return Object.assign({}, state, {error});


    default:
    return state;

  }
}
