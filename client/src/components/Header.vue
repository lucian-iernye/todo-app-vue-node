<template>
  <header>
    <h1>{{ title }}</h1>
    <Button
      @toggle-add-task="$emit('toggle-add-task')"
      :text="showAddTodo ? 'Close' : 'Add Todo'"
      :color="showAddTodo ? 'red' : 'blue'"
    />
  </header>
</template>

<script>
import Button from "@/components/Button";

export default {
  name: "Header",
  components: {
    Button,
  },
  props: {
    title: String,
    showAddTodo: Boolean,
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
