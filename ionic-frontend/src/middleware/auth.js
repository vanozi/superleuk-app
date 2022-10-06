export default async({ store, next, router }) => {
    if (!await store.state.auth.loggedInUser) {
      return router.push({ name: 'auth' });
    }
    return next();
  }