<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label for="todo">Todo</label>
      <input type="text" name="title" placeholder="Title" v-model="title" />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <input
        type="text"
        name="description"
        placeholder="Description"
        v-model="description"
      />
    </div>
    <input type="submit" value="Save todo" class="btn btn-block" />
  </form>
</template>

<script>
export default {
  name: "AddTodo",
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (!this.title) {
        alert("Title is required");
        return;
      }

      const newTodo = {
        id: Date.now(),
        title: this.title,
        description: this.description,
        completed: false,
      };

      this.$emit("add-todo", newTodo);

      this.title = "";
      this.description = "";

      // if(this.title.trim() === '') {
      //     return;
      //     } else {
      //         this.$emit('add-todo', {
      //             title: this.title,
      //             description: this.description
      //         });
      //         this.title = '';
      //         this.description = '';
      //     }
    },
  },
};
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>
