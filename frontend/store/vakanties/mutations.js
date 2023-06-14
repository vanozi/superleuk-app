export default {
  GETVAKANTIESALLUSERS(state, payload) {
    state.vakanties_all_users = payload;
  },
  GETVAKANTIESSINGLEUSER(state, payload) {
    state.vakanties_logged_in_user = payload;
  },
  ADDVAKANTIE(state, payload) {
    state.vakanties_logged_in_user.push(payload);
  },
  DELETEVAKANTIE(state, id) {
    const index = state.vakanties_logged_in_user.findIndex(item => item.id === id);
    state.vakanties_logged_in_user.splice(index, 1);

  }
}
