export const routes = Object.freeze({
  root: {
    title: 'Root',
    fullPath: '/',
    pattern: {
      path: '/',
    },
  },
  overview: {
    title: 'Overview',
    fullPath: '/overview',
    pattern: {
      path: 'overview',
    },
  },
  example: {
    title: 'Example',
    fullPath: '/example',
    pattern: {
      path: 'example',
    },
  },
  notFound: {
    title: 'Not Found',
    fullPath: '*',
    pattern: {
      path: '*',
    },
  },
});
