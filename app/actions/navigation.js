export const NAVIGATION_SET_ROUTES="NAVIGATION_PUSH";

export function setRoutes(routes) {
  return {
    type: NAVIGATION_SET_ROUTES,
    routes: routes
  };
}
