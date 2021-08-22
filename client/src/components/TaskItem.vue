<template>
  <div class="task" :class="taskStyle">
    <h3>
      <span>
        <input
          type="checkbox"
          name=""
          id="checkbox"
          @change="$emit('toggle-completed', task._id)"
        />
        {{ task.title }}</span
      >
      <i @click="$emit('delete-todo', task._id)" class="fas fa-times"></i>
    </h3>
    <p><span class="description">Description: </span>{{ task.description }}</p>
  </div>
</template>

<script>
export default {
  name: "TaskItem",
  props: {
    task: Object,
  },
  computed: {
    taskStyle() {
      if (this.task.completed) {
        return "complete";
      } else {
        return "";
      }
    },
  },
  methods: {},
};
</script>

<style>
.fas {
  color: red;
}
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
}

input {
  margin-right: 15px;
}

.description {
  font-weight: 300;
  font-style: italic;
  color: lightgray;
}

.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.complete {
  border-left: 5px solid green;
}
</style>
