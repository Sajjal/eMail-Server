<template>
  <div class="q-pt-xs bg-grey-6 row justify-center">
    <q-layout view="hHh Lpr lff" container class="shadow-2 rounded-borders bg-grey-10 text-white" :class="$route.name == 'Login' ? 'login' : 'home'">
      <q-header class="bg-black">
        <q-toolbar style="height:60px">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" v-if="$store.state.authorized" />
          <q-toolbar-title v-if="$q.screen.width <= 450"> ES </q-toolbar-title>
          <q-toolbar-title v-if="$q.screen.width > 450">S & D eMail Server</q-toolbar-title>
          <q-space />
          <q-btn round color="grey-10" icon="edit" v-if="$store.state.authorized" @click="handleFunctionCall('displayCompose')">
            <q-tooltip content-class="bg-amber text-black shadow-4" :offset="[10, 10]">
              Compose New Email !
            </q-tooltip>
          </q-btn>
          <q-input
            dark
            dense
            filled
            v-model="searchInput"
            input-class="text-right"
            class="q-ml-md"
            v-if="$store.state.authorized"
            style="width:180px"
            label="directory:keyword"
            @keyup.enter="handleSearch"
          >
            <template v-slot:append>
              <q-icon v-if="searchInput === ''" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="searchInput = ''" />
            </template>
          </q-input>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="500" content-class="bg-grey-9" v-if="$store.state.authorized">
        <q-scroll-area class="fit">
          <q-list>
            <template v-for="(menuItem, index) in menuList">
              <q-item :key="index" clickable :class="menuItem.label == activeMenu ? 'active' : ''" v-ripple @click="handleFunctionCall(`display${menuItem.label}`)">
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="menuItem.separator" />
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view :key="$route.fullPath" />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import readWriteData from '../composables/readWriteData';

const menuList = [
  {
    icon: 'mail_outline',
    label: 'Inbox',
    separator: true
  },
  {
    icon: 'outbox',
    label: 'Sent',
    separator: true
  },
  {
    icon: 'delete',
    label: 'Trash',
    separator: true
  },
  {
    icon: 'logout',
    label: 'Logout',
    separator: false
  }
];

export default {
  data() {
    return {
      drawer: false,
      activeMenu: 'Inbox',
      searchInput: '',
      limit: 10,
      skip: 0,
      menuList
    };
  },

  methods: {
    async handleFunctionCall(function_name) {
      await this[function_name]();
    },
    async displayInbox() {
      this.activeMenu = 'Inbox';
      if (this.$route.name !== 'Inbox') {
        this.$store.dispatch('updateSearch', {});
        await readWriteData().getEmails('emails', { directory: 'Inbox', skip: this.skip, limit: this.limit });
        this.$router.push({ name: 'Inbox' });
      }
    },
    async displaySent() {
      this.activeMenu = 'Sent';
      if (this.$route.name !== 'Sent') {
        this.$store.dispatch('updateSearch', {});
        await readWriteData().getEmails('emails', { directory: 'Sent', skip: this.skip, limit: this.limit });
        this.$router.push({ name: 'Sent' });
      }
    },
    async displayTrash() {
      this.activeMenu = 'Trash';
      if (this.$route.name !== 'Trash') {
        this.$store.dispatch('updateSearch', {});
        await readWriteData().getEmails('emails', { directory: 'Trash', skip: this.skip, limit: this.limit });
        this.$router.push({ name: 'Trash' });
      }
    },
    async displayCompose() {
      this.activeMenu = 'Compose';
      this.$router.push({ name: 'Compose' });
    },
    async displayLogout() {
      await readWriteData().logout();
      this.$store.dispatch('updateAuthorization', false);
      this.$router.push({ name: 'Login' });
    },
    async handleSearch() {
      let directory = null;
      let keyword = null;
      let searchTerm = null;
      if (this.searchInput) {
        searchTerm = this.searchInput.split(':');
        if (searchTerm.length == 2) {
          directory = searchTerm[0].toString();
          keyword = searchTerm[1].toString();
        } else {
          keyword = searchTerm[0].toString();
          directory = 'inbox';
        }
        this.$store.dispatch('updateSearch', { directory, searchTerm: keyword });
        await readWriteData().getEmails('search', { directory, searchTerm: keyword });
        this.$router.push({ name: 'Search', params: { directory, keyword } });
      }
    }
  }
};
</script>
<style scoped>
.active {
  color: yellowgreen;
  font-weight: bold;
}
.home {
  height: 630px;
  width: 1000px;
}
.login {
  height: 260px;
  width: 400px;
}
</style>
