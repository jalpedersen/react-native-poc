import * as types from '../actions/navigation';


export default function routes(state = [], action = {}) {
  switch (action.type) {

    case types.NAVIGATION_SET_ROUTES:
    return [...action.routes];

    default:
    return state;
  }
}
