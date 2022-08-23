export default {
    GETTANKTRANSACTIONS(state, payload) {
        console.log(payload)
        state.tank_transactions = payload
    },
}