import state from "../allowed_users/state";

export default {
    Users: state => state.allUsers,
    Werknemers: state => {
        var werknemers = []
        for (const x of state.allUsers)

        {
            const role_names = Array.from(x.roles, x => x.name)
            if (role_names.includes('werknemer') && x.is_active ==true) {
                werknemers.push(x)
            }
        }
        werknemers.sort((a, b) => {
          if (a.first_name < b.first_name) return -1;
          if (a.first_name > b.first_name) return 1;
          return 0;
      });
      return werknemers;
    }

}
