<template>
  <div class="actions">
    <div class="from"><strong>From:</strong> {{ emails[0].from }}</div>
    <div>
      <span v-if="source === 'Inbox'" class="material-icons reply" @click="handleReply(emails[0])">reply</span>
      <span class="material-icons" @click="handleDelete()">{{ removeIcon }}</span>
    </div>
  </div>
  <p><strong>Sender IP:</strong> {{ emails[0].sender_ip }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Date: </strong>{{ moment(emails[0].date).format("llll") }}</p>
  <p><strong>To:</strong> {{ emails[0].to }}</p>
  <p><strong>Subject:</strong> {{ emails[0].subject }}</p>
  <p class="message" v-html="emails[0].message"></p>
</template>

<script>
import getData from "../composables/getData";
import { useRouter } from "vue-router";
import moment from "moment";

export default {
  props: ["id", "source"],
  emits: ["updateStatus"],

  setup(props, context) {
    context.emit("updateStatus", true);

    const router = useRouter();
    const { emails, error, load, toTrash } = getData();

    const id = props.id;
    const source = props.source;

    const removeIcon = source === "Trash" ? "delete_forever" : "delete";

    load("search", { directory: source, id });

    function handleDelete() {
      toTrash("toTrash", { directory: source, id });
    }

    function handleReply(email) {
      router.push({
        name: "Compose",
        params: {
          status: true,
          from: email.from,
          to: email.to,
          subject: `RE: ${email.subject}`,
          message: `\r\n\r\n\r\n\r\n<br/><br/>--------------------------------<br/><br/>\r\n\r\n${email.message}`,
        },
      });
    }

    return { emails, removeIcon, handleReply, handleDelete, moment };
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
  cursor: pointer;
}
.material-icons.reply:hover {
  color: #2d8ec2;
}
</style>
