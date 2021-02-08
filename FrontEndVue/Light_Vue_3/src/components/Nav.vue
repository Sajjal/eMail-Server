<template>
  <hr />
  <div class="navbar">
    <div class="nav-icon">
      <!-- <router-link :to="{ name: 'Dashboard' }"><span class="material-icons">home</span></router-link> -->
      <router-link :to="{ name: 'Compose' }"><span class="material-icons ">edit</span></router-link>
    </div>
    <div class="nav-search">
      <form @submit.prevent="handleSearch">
        <input type="text" v-model="search" placeholder="Search...   | directory:keyword | " />
      </form>
    </div>
    <div class="nav-icon">
      <!-- <router-link :to="{ name: 'Dashboard' }"><span class="material-icons">refresh</span></router-link> -->
      <span @click="handleLogout" class="material-icons ">logout</span>
    </div>
  </div>
  <hr />
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import getData from "../composables/getData";

export default {
  emits: ["updateStatus"],
  setup(props, context) {
    const router = useRouter();
    const search = ref(null);

    const { logout } = getData();

    async function handleLogout() {
      await logout();
      context.emit("updateStatus", false);
    }

    function handleSearch() {
      let folder = null;
      let keyword = null;
      let searchTerm = null;
      if (search.value) {
        searchTerm = search.value.split(":");
        if (searchTerm.length == 2) {
          folder = searchTerm[0].toString();
          keyword = searchTerm[1].toString();
        } else {
          keyword = searchTerm[0].toString();
          folder = "inbox";
        }
        router.push({ name: "Search", params: { folder, keyword } });
      }
    }

    return { search, handleSearch, handleLogout };
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
}
.material-icons {
  font-size: 30px;
  border: 1px solid #64686b;
  padding: 5px 5px;
  color: black;
  cursor: pointer;
}

input {
  width: 710px;
  padding: 10px 10px;
  background-color: #dfe1e8;
  border: 1px solid #64686b;
  outline: none;
  font-size: 18px;
  margin: 0px 20px;
}

.nav-icon :hover,
.nav-icon :hover .material-icons {
  color: #f1f1f1 !important;
  background-color: #2d8ec2;
}
.nav-icon .router-link-active,
.nav-icon .router-link-active .material-icons {
  color: #f1f1f1 !important;
  background-color: #2d8ec2;
}
</style>
