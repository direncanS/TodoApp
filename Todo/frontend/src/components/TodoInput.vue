<template>
   <div class="todo-wrapper">
    <div class="input-group">
      <input class="todo-input" type="text" placeholder="Enter next todo..." v-model="value">
      <button class="add-btn" @click="enter">Add Todo</button>
    </div>
    
  </div>
</template>


<script>
import { createTodo } from '../api'; // Adjust the path as necessary

export default {
  name: "TodoInput",
  data() {
    return {
      value: ''
    }
  },
  methods: {
    // enter() {
    //   if (this.value.trim()) {
    //     // console.log("sending this value:",typeof this.value);
    //     createTodo(this.value)
    //       .then(todo => {
    //         this.$emit('new-todo', todo);
    //         this.value = ''; // Clear the input field
    //       })
    //       .catch(error => {
    //         console.error("Error adding the todo:", error);
    //       });
    //   }
    // }

    enter() {
      if (!this.value.trim()) return;
      
      this.$emit('new-todo', this.value); // Emit the value directly
      this.value = ''; // Clear the input field
    }
  }
}
</script>
<style scoped>
.todo-input {
  line-height: 1.6;
  font-size: 15px;
  color: var(--color-text);
  width: 400px;
  padding: 10px 20px;
  margin: 10px;

  border: 1px solid grey;
  border-radius: 20px;

  display: flex;
  flex-wrap: nowrap;

  background-color: #282828;
  transition: background-color 0.2s;
}
.todo-wrapper {
  max-width: 600px;
  margin: auto;
}

.input-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-input {
  flex: 1;
  padding: 8px;
  margin-right: 8px;
}

.add-btn {
  padding: 10px 8px;
  cursor: pointer;
  border: 0;
  background-color: #2c3e50;
  border-radius: 3vh;
}
.todo-input:focus {
  background-color: #2c3e50;
  outline: none;
}
</style>