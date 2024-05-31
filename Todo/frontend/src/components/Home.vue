<template>
  <div>
    <Navbar />
    <div class="Home-Todo">
      <div class="header-with-toggle">
        <h1 class="todo-heading">Manage your Todos</h1>
        <label class="switch">
          <input type="checkbox" v-model="isSorted">
          <span class="slider round"></span>
        </label>
        <span class="sort-label">Sort by <br/> Completion Date</span>
      </div>
      <TodoList :sorted="isSorted" />
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import TodoList from '@/components/TodoList.vue'
import { ref } from 'vue';

const isSorted = ref(false);
</script>

<style scoped>

    .header-with-toggle{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .Home-Todo{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .todo-heading{
      font-size: 7vh;
      font-weight: bold;
      width: 30%;
      text-align: center;
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* The slider */
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 34px;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }

    input:checked + .slider {
      background-color: #2196F3;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
      transform: translateX(26px);
    }

    /* Optional: Adds shadows to create more depth */
    /* Ensure text isn't selectable */
    .sort-label {
      margin-left: 10px;
      user-select: none;
    }

</style>  