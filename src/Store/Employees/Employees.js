import axios from "axios";

export const Employees = {
    state: {
        employees: [],
    }, // initial state
    reducers: {
        // handle state changes with pure functions
        setEmployees(state, payload) {
            return {...state, employees: payload};
        },
    },
    effects: (dispatch) => ({
        async getEmployees() {
            let employees = await axios.get('/users')
            let {data} = await employees;
            dispatch.employees.setEmployees(data);
        },
    }),
};