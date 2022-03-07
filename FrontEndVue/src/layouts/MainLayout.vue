<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-accent text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" class="lt-md" />
        <q-toolbar-title class="q-pa-md">
          <q-avatar class="q-mb-sm q-mr-md" square size="30px" style="cursor: pointer" @click="goToHome">
            <img src="logo.png" />
          </q-avatar>
          <span style="cursor: pointer" @click="goToHome"> S & D Email Server </span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above :width="300" v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <leftSidebarMenu v-if="store.state.isLoggedIn" />
      <leftSidebarskeleton v-else />
    </q-drawer>

    <q-page-container class="q-px-sm q-mb-md">
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-8 text-white">
      <div class="text-center q-pa-sm">
        <span class="q-ml-md"> S & D Email Server | github.com/Sajjal </span>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import leftSidebarMenu from '../components/leftSidebarMenu.vue';
import leftSidebarskeleton from '../components/leftSideBarSkeleton.vue';

const drawer = ref(false);
const router = useRouter();
const store = useStore();

const leftDrawerOpen = ref(false);

watch(
  () => store.state.leftDrawerOpen,
  function () {
    leftDrawerOpen.value = store.state.leftDrawerOpen;
  }
);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
  store.dispatch('openCloseSidebar', leftDrawerOpen.value);
}

function goToHome() {
  store.dispatch('updateCurrentPage', 'Inbox');
  router.push({ name: 'Index' });
}
</script>