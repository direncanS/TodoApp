<template>
 <div class="todo_itemDIV">
    <div class="todo-item" @click="done">
      <span :class="{done: todo.done}">{{ todo.name }}</span>
      <Checkmark :done="todo.done" />
    </div>
    <div class="creation-date" v-if="todo.completionDate">Completed on: {{ todo.completionDate }}</div>
</div>
</template>


<script>
import Checkmark from "@/components/icons/Checkmark.vue";

export default {
  name: "Todo",
  components: {Checkmark},
  props: {
    todo: Object
  },
  methods: {
    done() {
      if (this.todo.done) {
        this.$emit('undone', this.todo.id);
      } else {
        this.$emit('done', this.todo.id);
      }
    }
  }
}
</script>

<style scoped>
.todo-item {
  /* width: 400px;
  padding: 10px 20px;
  margin: 10px;

  border: 1px solid grey;
  border-radius: 20px; */

  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
/* 
  background-color: #282828;
  transition: background-color 0.2s; */
}
.todo_itemDIV{
  width: 400px;
  padding: 10px 20px;
  margin: 10px;

  border: 1px solid grey;
  border-radius: 20px;

  display: flex;
  flex-direction:column;
  flex-wrap: nowrap;
  justify-content: space-between;
  /* align-items: center; */

  background-color: #282828;
  transition: background-color 0.2s;
}
/* .todo-item:hover {
  background-color: red;
} */

.done {
  text-decoration: line-through;
  color: #5c5c5c;
}
.creation-date {
  font-size: 0.75rem;
  color: #666;
  display: block; /* Ensure this is a block element */
  margin-top: 4px; 
}
</style>