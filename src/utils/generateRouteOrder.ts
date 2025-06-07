import type { RouteRecordRaw } from 'vue-router';

export const generateRouteOrder = (routes: RouteRecordRaw[]): Record<string, number> => {
  const routeOrder: Record<string, number> = {};
  let index = 0;

  function traverse(routes: RouteRecordRaw[], parentPath = '') {
    for (const route of routes) {
      let fullPath = route.path.startsWith('/')
        ? route.path
        : parentPath + (parentPath.endsWith('/') ? '' : '/') + route.path;

      if (route.path === '') {
        fullPath = parentPath;
      }

      routeOrder[fullPath] = index++;

      if (route.children && route.children.length) {
        traverse(route.children, fullPath);
      }
    }
  }

  traverse(routes);
  return routeOrder;
};
