<template>
  <div v-if="error" class="error">
    {{ error }}
  </div>
  <div v-else class="emailList" v-for="email in emails" :key="email.id">
    <p @click="handleClick(email._id)">
      <strong>From:</strong> {{ email.from }} <span>{{ new Date(email.date) }}</span> <br />
      <strong>Subject:</strong> {{ email.subject }}
    </p>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import getData from "../composables/getData";

export default {
  props: ["keyword", "folder"],
  emits: ["updateStatus"],
  setup(props, context) {
    context.emit("updateStatus", true);

    const { emails, count, error, load } = getData();

    const router = useRouter();
    let directory = router.currentRoute.value.name;

    const searchTerm = props.keyword;
    let limit = 10;
    let skip = 0;
    let temp = [];

    //Query server for Emails
    async function getEmails() {
      if (searchTerm && directory == "Search") {
        directory = props.folder;
        await load("search", { directory, searchTerm, skip, limit });
        temp = [...temp, ...emails.value];
      } else {
        await load("emails", { directory, skip, limit });
        temp = [...temp, ...emails.value];
      }
    }
    getEmails();

    //Pagination: Infinite Scroll
    window.addEventListener(
      "scroll",
      async function(event) {
        if (emails.value.length < count.value) {
          const element = event.target;
          if (element.scrollHeight - Math.floor(element.scrollTop) === element.clientHeight) {
            skip = limit;
            limit = limit + 10;

            if (searchTerm) {
              directory = props.folder;
              await load("search", { directory, searchTerm, skip, limit });
              emails.value = [...temp, ...emails.value];
              error.value = null;
            } else {
              await load("emails", { directory, skip, limit });
              emails.value = [...temp, ...emails.value];
              error.value = null;
            }
          }
        }
      },
      true
    );

    function handleClick(id) {
      router.push({ name: "Email", params: { id, source: directory } });
    }

    return { emails, error, handleClick };
  },
};
</script>

<style scoped>
p {
  border-bottom: 1px dotted gray;
  padding: 5px 0px;
  cursor: pointer;
}
.emailList:hover {
  color: #2d8ec2;
  font-size: 18px;
}
span {
  float: right;
}
.error {
  margin: 30px auto;
  color: red;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
}
</style>
