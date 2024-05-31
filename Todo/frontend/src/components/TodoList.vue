<template>
  <div>
    <TodoInput @new-todo="post" v-if="todos.length > 0 || showNoTodosMessage" />
    <ul v-if="todos.length > 0">
      <li v-for="(todo, index) in sortedTodos" :key="todo.id">
        <Todo :todo="todo" @done="done" @undone="undone" />
      </li>
    </ul>
    <div v-if="showNoTodosMessage">
      <p class="large-text">No todos found. Create your first todo!</p>
    </div>
    <div v-if="showLoginMessage">
      <p class="large-text">Please login to manage your todos.</p>
    </div>
  </div>
</template>

<script>
import Todo from "@/components/Todo.vue";
import TodoInput from "@/components/TodoInput.vue";
import { createTodo, doneTodo, readTodos, undoneTodo, updateTodoCreationDate  } from "@/api";
import { watch, computed } from 'vue';

export default {
  name: "TodoList",
  components: { TodoInput, Todo },
  props: ['sorted'],
  data() {
    return {
      todos: [],
      showNoTodosMessage: false,
      showLoginMessage: false,
      isFetching: false
    };
  },
  computed: {
  sortedTodos() {
    if (this.sorted) {
      // Sort such that completed todos with the most recent completion dates appear first
      return [...this.todos].sort((a, b) => {
        if (a.completionDate === null && b.completionDate === null) {
          return 0;  // No need to sort if both are null
        } else if (a.completionDate === null) {
          return 1;  // a should come after b
        } else if (b.completionDate === null) {
          return -1; // b should come after a
        } else {
          // Compare dates in descending order
          return new Date(b.completionDate) - new Date(a.completionDate);
        }
      });
    }
    return this.todos;
  }
},

  methods: {
    async getAll() {
      this.isFetching = true;
      try {
        const response = await readTodos();
        if (response.status === 200 && response.data.length > 0) {
          this.todos = response.data;
          this.showNoTodosMessage = false;
          this.showLoginMessage = false;
          this.checkAndUpdateTodos(); 
        } else if (response.status === 200 && response.data.message === "ADD") {
          this.showNoTodosMessage = true;
        } else if (response.status === 200 && response.data.message === "NOAUTH") {
          this.showLoginMessage = true;
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
        this.showLoginMessage = error.response && error.response.status === 404;
        this.showNoTodosMessage = !this.showLoginMessage;
      } finally {
        this.isFetching = false;
      }
    },
    async post(name) {
      const todo = await createTodo(name);
      this.getAll()
      this.todos.push(todo);
    },
    async done(id) {
      const updatedTodo = await doneTodo(id);
      this.update(id, updatedTodo);
    },
    async undone(id) {
      const updatedTodo = await undoneTodo(id);
      this.update(id, updatedTodo);
    },
    update(id, updatedTodo) {
      const index = this.todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        this.todos[index] = updatedTodo;
      }
    },
    checkAndUpdateTodos() {
      console.log("checkAndUpdateTodos",this.todos.length)
      const currentDate = new Date().toISOString().slice(0, 10);
      const now = new Date();
      const isoString = now.toISOString();
      console.log("isoString:",isoString); // "2024-05-07T12:34:56.789Z"

      this.todos.forEach(async (todo) => {
        console.log("todo.id,todo.creationDate:",todo.id,todo.creationDate)
        if (!todo.done && todo.creationDate < currentDate) {
          try {
            const response = await updateTodoCreationDate(todo.id); // Assuming this is the method to call the endpoint
            if (response.status === 200) {
              this.update(todo.id, response.data);
            }
          } catch (error) {
            console.error("Failed to update creation date for Todo:", todo.id, error);
          }
        }
      });
    },
  },
  created() {
    this.getAll();
    // this.checkAndUpdateTodos(); 
  },
  watch: {
    sorted: {
      handler() {
        // Trigger re-computation when sorted state changes
      },
      immediate: true
    }
  }
};
</script>



<style scoped>
ul {
  list-style-type: none;
}
.large-text {
  font-size: 24px; /* Customize the size as needed */
}
</style>