<template>
  <div class="container">
    <Header
      :showAddTodo="showAddTodo"
      @toggle-add-task="toggleAddTask"
      title="Todo list"
    />
    <div v-show="showAddTodo">
      <AddTodo @add-todo="addTodo" />
    </div>
    <Tasks
      @toggle-completed="toggleCompleted"
      @delete-todo="deleteTodo"
      :tasks="tasks"
    />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Tasks from "./components/Tasks.vue";
import AddTodo from "./components/AddTodo.vue";

export default {
  name: "App",
  components: {
    Header,
    Tasks,
    AddTodo,
  },
  data() {
    return {
      tasks: [],
      showAddTodo: false,
      completed: false,
    };
  },
  async created() {
    this.tasks = await this.fetchTodos();
  },
  methods: {
    async addTodo(todo) {
      const res = await fetch("http://localhost:3000/add-todo", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      this.tasks = [...this.tasks, data];
    },

    toggleAddTask() {
      this.showAddTodo = !this.showAddTodo;
    },

    async deleteTodo(id) {
      if (confirm("Are you sure you want to delete this task?")) {
        const res = await fetch(`http://localhost:3000/delete-todo/${id}`, {
          method: "DELETE",
        });
        res.status === 200
          ? (this.tasks = this.tasks.filter((task) => task._id !== id))
          : alert("Something went wrong");
      }
    },

    toggleCompleted(id) {
      const res = fetch(`http://localhost:3000/toggle-completed/${id}`, {
        method: "PATCH",
      });
      res.status === 200
        ? (this.tasks = this.tasks.map((task) =>
            task._id === id ? { ...task, completed: !task.completed } : task
          ))
        : alert("Something went wrong");
    },

    async fetchTodos() {
      const response = await fetch("http://localhost:3000/todos");
      const data = await response.json();
      console.log(data);
      return data;
    },

    async fetchTodo(id) {
      const response = await fetch(`http://localhost:3000/todos${id}`);
      const data = await response.json();
      console.log(data);
      return data;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Poppins", sans-serif;
}

.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
