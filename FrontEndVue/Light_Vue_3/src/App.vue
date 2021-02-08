<template>
  <div class="container">
    <h1>S & D eMail Server</h1>
    <div v-if="authorized">
      <Nav @updateStatus="updateStatus" />
      <Sidebar />
    </div>

    <div class="mainContent">
      <div :class="authorized ? 'content' : ''">
        <router-view :key="$route.fullPath" @updateStatus="updateStatus" />
      </div>
    </div>

    <div class="footer">S & D eMail Server | github: @Sajjal</div>
  </div>
</template>

<script>
import { ref } from "vue";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";

export default {
  components: { Nav, Sidebar },
  setup() {
    const authorized = ref(false);

    function updateStatus(status) {
      authorized.value = status;
    }

    return { authorized, updateStatus };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.sidebar {
  float: left;
}
.content {
  float: left;
  text-align: left;
  margin-top: 10px;
  margin-left: 6%;
  border: 1px dotted gray;
  width: 76.5%;
  padding: 0px 20px;
  height: 450px;
  overflow: auto;
}
.mainContent::after {
  display: block;
  content: "";
  clear: both;
}
</style>
