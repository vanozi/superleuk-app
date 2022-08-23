export default {
    get_all_tank_transactions: state => state.tank_transactions,
    get_transaction_by_id: (state) => (id) => {
        return state.tank_transactions.find(transaction => transaction.id === id) },
    get_transactions_by_vehicle: (state) => (vehicle) => {
            return state.tank_transactions.find(transaction => transaction.vehicle === vehicle) }
}