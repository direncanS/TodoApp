import axios from "axios";

const readTodos = async () => {
    return await axios.get(`http://${import.meta.env.VITE_BACKEND}/todos`);
}

const createTodo = async (name) => {
    const n = String(name);

    try {
        let res = await axios.post(
            `http://${import.meta.env.VITE_BACKEND}/todos`,
            {
                'todoname': n
            }
        );
        return res.data;
    } catch (error) {
        console.error("Error in createTodo:", error);
        throw error;
    }
}

const updateTodoCreationDate = async (todoId) => {
    try {
        console.log("updateTodoCreationDate")
        const response = await axios.put(`http://${import.meta.env.VITE_BACKEND}/todos/${todoId}/update-date`);
        return response;
    } catch (error) {
        console.error('Error updating Todo creation date:', error);
        throw error;
    }
}
const doneTodo = async (id) => {
    let res = await axios.put(
        `http://${import.meta.env.VITE_BACKEND}/todos/${id}/done`
    );

    return res.data;
}

const undoneTodo = async (id) => {
    let res = await axios.delete(
        `http://${import.meta.env.VITE_BACKEND}/todos/${id}/done`
    );

    return res.data;
}

const register = async (email, password, group) => {
    try {
        let res = await axios.post(`http://${import.meta.env.VITE_BACKEND}/users/register`, {
            email,
            password,
            group
        });
        return res.data;
    }
    catch (error) {
        console.error(`Error in register(${email}, ${password}, ${group}):`, error.response.data);
        throw error;
    }
}

const registerA = (email, password) => register(email, password, 'A');
const registerB = (email, password) => register(email, password, 'B');

const login = async (email, password) => {
    try {
        let res = await axios.post(`http://${import.meta.env.VITE_BACKEND}/users/login`, {
            email: email,
            password: password
        });

        localStorage.setItem('authToken', res.data.token);
        localStorage.setItem('userEmail', res.data.email);
        localStorage.setItem('userId', res.data.id);
        return res.data;
    } catch (error) {
        console.error("Error in login:", error.response.data);
        throw error;
    }
}

export {
    readTodos,
    createTodo,
    updateTodoCreationDate,
    doneTodo,
    undoneTodo,
    registerA,
    registerB,
    login
}