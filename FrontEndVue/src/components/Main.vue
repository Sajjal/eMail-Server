<template>
  <div class="actions">
    <div class="from"><strong>From:</strong> {{ emails[0].from }}</div>
    <div>
      <span class="material-icons" @click="handleDelete()">{{ removeIcon }}</span>
    </div>
  </div>
  <p><strong>Sender IP:</strong> {{ emails[0].sender_ip }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Date:</strong>{{ new Date(emails[0].date) }}</p>
  <p><strong>To:</strong> {{ emails[0].to }}</p>
  <p><strong>Subject:</strong> {{ emails[0].subject }}</p>
  <p class="message" v-html="emails[0].message"></p>
</template>

<script>
import getData from "../composables/getData";

export default {
  props: ["id", "source"],
  emits: ["updateStatus"],

  setup(props, context) {
    context.emit("updateStatus", true);

    const { emails, error, load, toTrash } = getData();

    const id = props.id;
    const source = props.source;

    const removeIcon = source === "Trash" ? "delete_forever" : "delete";

    load("search", { directory: source, id });

    function handleDelete() {
      toTrash("toTrash", { directory: source, id });
    }

    return { emails, removeIcon, handleDelete };
  },
};
</script>

<style scoped>
p {
  border-bottom: 1px dotted gray;
  padding: 5px 0px;
}
.message {
  padding: 10px 0px;
  border: none;
}

button {
  padding: 10px 10px;
  margin: 10px 10px;
}
.actions {
  padding: 5px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dotted gray;
}
.material-icons {
  margin-left: 15px;
  color: black;
}
.material-icons:hover {
  color: red;
}
</style>
