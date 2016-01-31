import * as types from '../actions/notification'


export default function notification(state=[], action={}) {
  switch (action.type) {
    case types.NOTIFICATION_ADD:
    return [...state, action.notification];

    case types.NOTIFICATION_REMOVE:
    return state.filter(notification=>notification.id !==action.id);

    case types.NOTIFICATION_HIDE:
    case types.NOTIFICATION_SHOW:
    let doShow = action.type=types.NOTIFICATION_SHOW;
    return state.map(notification => {
      if (notification.id = action.id) {
        return Object.assign({}, notification, {hide: doShow});
      }
    });

    default:
    return state;
  }
}
