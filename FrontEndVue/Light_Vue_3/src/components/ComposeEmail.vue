<template>
  <div>
    <div v-if="status" class="heading">Reply To: {{ from }}</div>
    <div v-else class="heading">{{ clearAll() }}Compose New eMail</div>
    <hr />
    <form @submit.prevent="handleSubmit">
      <input type="email" placeholder="From" v-model="data.from" required />
      <input type="text" placeholder="To" v-model="data.to" required />
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
  props: ["status", "from", "to", "subject", "message"],

  setup(props, context) {
    context.emit("updateStatus", true);

    const { error, sendMail } = getData();
    let data = ref({ from: props.to, to: props.from, subject: props.subject, message: props.message, date: Date.now() });

    function handleSubmit() {
      sendMail(data.value);
    }

    function clearAll() {
      data.value.from = "";
      data.value.to = "";
      data.value.subject = "";
      data.value.message = "";
      data = ref({ from: "", to: "", subject: "", message: "", date: Date.now() });
    }

    return { data, handleSubmit, clearAll };
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
