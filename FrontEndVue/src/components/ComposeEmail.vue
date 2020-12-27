<template>
  <div>
    <div class="heading">Compose New eMail</div>
    <hr />
    <form @submit.prevent="handleSubmit">
      <input type="email" placeholder="From" v-model="data.from" required />
      <input type="email" placeholder="To" v-model="data.to" required />
      <input type="text" placeholder="Subject" v-model="data.subject" required />
      <textarea placeholder="Message" v-model="data.message" required></textarea>
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import getData from "../composables/getData";

export default {
  emits: ["updateStatus"],

  setup(props, context) {
    context.emit("updateStatus", true);

    const { error, sendMail } = getData();
    const data = ref({ from: "", to: "", subject: "", message: "", date: Date.now() });

    function handleSubmit() {
      sendMail(data.value);
    }

    return { data, handleSubmit };
  },
};
</script>

<style scoped>
input,
textarea {
  width: 96%;
  background-color: #dfe1e8;
  border: 1px solid #64686b;
  outline: none;
  font-size: 14px;
  margin-top: 10px;
  padding: 10px 10px;
}
textarea {
  height: 150px;
}

.heading {
  margin: 10px 5px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}
</style>
