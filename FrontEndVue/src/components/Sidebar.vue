<template>
  <div class="sidebar">
    <router-link :to="{ name: 'Inbox' }">
      <div class="sidebar-option">
        <div class="icon"><span class="material-icons">email</span></div>
        <p>Inbox</p>
      </div>
    </router-link>

    <router-link :to="{ name: 'Sent' }">
      <div class="sidebar-option">
        <div class="icon"><span class="material-icons">outbox</span></div>
        <p>Sent</p>
      </div>
    </router-link>

    <router-link :to="{ name: 'Trash' }">
      <div class="sidebar-option">
        <div class="icon"><span class="material-icons">delete</span></div>
        <p>Trash</p>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.sidebar-option {
  margin: 10px 0;
  line-height: 10px;
  width: 100%;
  padding: 1px 10px;
  border: 1px dotted gray;
  font-weight: bold;
  display: flex;
  align-items: center;
  font-size: 20px;
}
p {
  margin-left: 10px;
  color: black;
  text-decoration: none;
}
.material-icons {
  color: black;
  cursor: pointer;
}
.sidebar-option:hover,
.sidebar-option:hover p,
.sidebar-option:hover .material-icons {
  color: #f1f1f1 !important;
  background-color: #2d8ec2;
}

.router-link-active .sidebar-option,
.router-link-active .sidebar-option p,
.router-link-active .sidebar-option .material-icons {
  color: #fff !important;
  background-color: #2d8ec2;
}
</style>
