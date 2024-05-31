import axios from "axios";

const readTodos = async () => {
  let res = await axios.get('http://localhost:8080/todos');

  return res;
}

const createTodo = async (name) => {
    // Ensure n is a string by converting it explicitly
    const n = String(name);  // Converts name to string if it isn't already

    try {
        let res = await axios.post(
            'http://localhost:8080/todos',
            {
                'todoname': n  // Send as part of the request body
            }
        );
        // console.log("Name:", name);
        return res.data;
    } catch (error) {
        console.error("Error in createTodo:", error);
        throw error;  // Propagate the error to be handled by the caller
    }
}

const updateTodoCreationDate = async(todoId) =>{
  try {
    console.log("updateTodoCreationDate")
      const response = await axios.put(`http://localhost:8080/todos/${todoId}/update-date`);
      return response;
  } catch (error) {
      console.error('Error updating Todo creation date:', error);
      throw error; // Rethrow the error to handle it in the component
  }
}
const doneTodo = async (id) => {
    let res = await axios.put(
        `http://localhost:8080/todos/${id}/done`
    );

    return res.data;
}

const undoneTodo = async (id) => {
    let res = await axios.delete(
        `http://localhost:8080/todos/${id}/done`
    );

    return res.data;
}
const registerA = async (email, password) => {
    try {
      let res = await axios.post('http://localhost:8080/users/registerA', {
        email: email,
        password: password
      });
      return res.data;  // Return the server response
    } 
    catch (error) {
      console.error("Error in registerA:", error.response.data);
      throw error;  // Rethrow to handle in the component
    }
  }

const registerB = async (email, password) => {
    try {
      let res = await axios.post('http://localhost:8080/users/registerB', {
        email: email,
        password: password
      });
      return res.data;  // Return the server response
    } 
    catch (error) {
      console.error("Error in registerB:", error.response.data);
      throw error;  // Rethrow to handle in the component
    }
  }
  // Add to your existing API utilities
const login = async (email, password) => {
  try {
    let res = await axios.post('http://localhost:8080/users/login', {
      email: email,
      password: password
    });
        
    localStorage.setItem('authToken', res.data.token);
    localStorage.setItem('userEmail', res.data.email);
    localStorage.setItem('userId', res.data.id);
    return res.data;  // this would usually include a token and user details
  } catch (error) {
    console.error("Error in login:", error.response.data);
    throw error;  // Rethrow to handle in the component
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