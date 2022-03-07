<template>
  <div class="q-pa-sm text-bold bg-grey-3 text-grey-7 q-pl-lg" style="font-size: 16px">
    <q-item>
      <q-item-section>
        <q-item-label> CATEGORIES</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn round color="grey-10" icon="edit" size="sm" @click="route('Compose')" />
      </q-item-section>
    </q-item>
  </div>
  <div>
    <q-list class="text-bold q-mt-sm" style="font-size: 16px">
      <q-item clickable @click="route('Inbox')">
        <q-item-section avatar class="q-ml-lg"> <q-icon name="mail" size="sm" /> </q-item-section>
        <q-item-section>Inbox</q-item-section>
      </q-item>
      <q-separator spaced />
      <q-item clickable @click="route('Starred')">
        <q-item-section avatar class="q-ml-lg"> <q-icon name="star" size="sm" /> </q-item-section>
        <q-item-section>Starred</q-item-section>
      </q-item>
      <q-separator spaced />

      <q-item clickable @click="route('Sent')">
        <q-item-section avatar class="q-ml-lg"> <q-icon name="send" size="sm" /> </q-item-section>
        <q-item-section>Sent</q-item-section>
      </q-item>
      <q-separator spaced />

      <q-item clickable @click="route('Trash')">
        <q-item-section avatar class="q-ml-lg"> <q-icon name="delete" size="sm" /> </q-item-section>
        <q-item-section>Trash</q-item-section>
      </q-item>
      <q-separator spaced />
      <q-item clickable @click="logout">
        <q-item-section avatar class="q-ml-lg"> <q-icon name="logout" size="sm" /> </q-item-section>
        <q-item-section>Logout</q-item-section>
      </q-item>
      <q-separator spaced />
    </q-list>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import getServerData from '../util/getServerData';

const store = useStore();
const router = useRouter();
const { logout } = getServerData();

function route(page) {
  if (page == store.state.currentPage) return;
  store.dispatch('updateCurrentPage', page);
  store.dispatch('updateSkipLimit', { skip: 0, limit: 10 });
  store.dispatch('updateCurrentMessage', {});
  store.dispatch('updateEditMode', 'Compose');
  store.dispatch('openCloseSidebar', false);
  if (page == 'Compose') return router.push({ name: 'Compose' });
  router.push({ name: 'Index' });
}
</script>