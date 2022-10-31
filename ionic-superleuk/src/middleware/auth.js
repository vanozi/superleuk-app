// src/middleware/auth.js
export default function auth({ next, router, store }) {
    if (store.auth.state.loggedIn == null) {
      console.log('Niet ingelogd')
      return router.push('/login');
    }

    return next();
  }