<template>
  <div v-if="loginError" class="error">
    {{ loginError }}
    <hr />
  </div>

  <form @submit.prevent="handleSubmit">
    <input type="text" v-model="accessCode" placeholder="Enter Access Code" />
    <button>Login</button>
  </form>
</template>

<script>
import { ref } from "vue";
import getData from "../composables/getData";

export default {
  emits: ["updateStatus"],
  setup(props, context) {
    context.emit("updateStatus", false);

    const { loginError, login } = getData();
    const accessCode = ref(null);

    function handleSubmit() {
      login({ accessCode: accessCode.value });
    }

    return { handleSubmit, loginError, accessCode };
  },
};
</script>

<style scoped>
input {
  width: 85.6%;
  background-color: #dfe1e8;
  border: 1px solid #64686b;
  outline: none;
  font-size: 14px;
  margin: 10px 10px;
  padding: 10px 10px;
}
.error {
  color: maroon;
  font-weight: bold;
  padding: 0px 10px;
}
</style>
