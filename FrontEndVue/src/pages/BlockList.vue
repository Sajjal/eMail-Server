<template>
  <div class="q-mt-sm sd-center text-bold text-purple" style="font-size: 20px">
    <q-item>
      <q-item-section avatar>
        <q-icon name="block" size="md" />
      </q-item-section>
      <q-item-section> {{ store.state.currentPage }} </q-item-section>

      <q-item-section class="gt-sm" v-if="store.state.count" style="font-size: 14px">
        <q-item>
          <q-item-section side>
            <q-btn flat round color="primary" icon="chevron_left" size="sm" @click="previous" />
          </q-item-section>
          <q-item-section side> {{ store.state.skip + 1 }}-{{ store.state.count < store.state.skip + 10 ? store.state.count : store.state.skip + 10 }} of {{ store.state.count }} </q-item-section>
          <q-item-section side>
            <q-btn flat round color="primary" icon="navigate_next" size="sm" @click="next" />
          </q-item-section>
        </q-item>
      </q-item-section>

      <q-item-section avatar>
        <q-btn outline round color="purple" icon="add" size="md" @click="openDialog('add')">
          <q-tooltip class="bg-purple text-white"> Block Own Mailbox </q-tooltip>
        </q-btn>
      </q-item-section>
      <q-item-section avatar>
        <q-btn outline round :loading="loading" color="primary" icon="sync" size="md" @click="refresh">
          <template v-slot:loading>
            <q-spinner-pie />
          </template>
          <q-tooltip class="bg-primary text-white"> Refresh </q-tooltip>
        </q-btn>
      </q-item-section>
    </q-item>
    <q-separator class="bg-grey-4 q-mx-md lt-md" />
    <q-item class="lt-md" v-if="store.state.count" style="font-size: 14px">
      <q-item-section side>
        <q-btn flat round color="primary" icon="chevron_left" size="sm" @click="previous" />
      </q-item-section>
      <q-item-section side> {{ store.state.skip + 1 }}-{{ store.state.count < store.state.skip + 10 ? store.state.count : store.state.skip + 10 }} of {{ store.state.count }} </q-item-section>
      <q-item-section side>
        <q-btn flat round color="primary" icon="navigate_next" size="sm" @click="next" />
      </q-item-section>
    </q-item>
    <q-separator :class="isPC ? 'bg-grey-4  q-mx-md' : 'bg-grey-4 q-mx-md'" />
  </div>

  <div class="sd-center q-mt-md">
    <q-list style="max-width: 1000px">
      <q-scroll-area style="height: 69vh">
        <q-item v-if="error">
          <q-item-section>
            <q-item-label lines="1">
              <span class="text-subtitle2"> {{ error }} </span>
            </q-item-label>
          </q-item-section>
        </q-item>

        <div v-else v-for="item in blockList" :key="item._id">
          <q-item>
            <q-item-section avatar>
              <q-avatar :color="item.type == 'other_sender' ? 'red-9' : 'primary'" text-color="white" :icon="item.type == 'other_sender' ? 'input' : 'inbox'" />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">
                <span class="text-grey-8 text-bold"> {{ item.email ? item.email.split('<')[0].replace(/[^a-z0-9@,. ]/gi, '') : '' }} </span>
              </q-item-label>
              <q-item-label caption lines="2">
                {{ date.formatDate(item.date, 'ddd, DD MMM YYYY,  hh:mm A') }} -- <span class="text-weight-bold"> {{ item.email.includes('<') ? item.email.split('<')[1].split('>')[0] : item.email }} </span>
              </q-item-label>
            </q-item-section>

            <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn size="12px" flat dense round class="text-red-9" icon="remove_circle_outline" @click="openDialog('unblock', { email: item.email, id: item._id, type: item.type })">
                  <q-tooltip class="bg-red-9 text-white"> Unblock </q-tooltip>
                </q-btn>
              </div>
            </q-item-section>
          </q-item>
          <q-separator spaced />
        </div>
      </q-scroll-area>
    </q-list>
  </div>

  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 250px">
      <q-card-section class="row items-center">
        <q-item>
          <q-item-section top avatar>
            <q-avatar icon="report" color="red" text-color="white" />
          </q-item-section>

          <q-item-section>
            <q-item-label v-if="dialogMode == 'add'"> Enter the Mailbox You want to Block! </q-item-label>
            <q-item-label v-if="dialogMode == 'unblock'"> Are You Sure to Unblock? </q-item-label>

            <q-item-label caption lines="3" v-if="dialogMode == 'add'"> You will not receive any email coming to this Mailbox! </q-item-label>
            <q-item-label caption lines="3" v-if="dialogMode == 'unblock'">
              You will start receiving emails {{ currentItem.type == 'other_sender' ? 'from' : 'to' }} <span class="text-bold"> {{ currentItem.email }} </span> again!
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset="item" />
      </q-card-section>

      <q-card-section class="q-pt-none q-mx-lg" v-if="dialogMode == 'add'">
        <q-input dense v-model="mailboxToBlock" autofocus @keyup.enter="confirm" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="closeDialog" />
        <q-btn flat :label="dialogMode == 'add' ? 'Block' : 'Unblock'" color="red" @click="confirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useQuasar, date } from 'quasar';
import { useStore } from 'vuex';
import getServerData from '../util/getServerData';

const store = useStore();
const $q = useQuasar();
const { load, block, unblock } = getServerData();

const isPC = $q.platform.is.mobile ? false : true;
const blockList = ref([]);
const loading = ref(false);
const prompt = ref(false);
const dialogMode = ref('add');
const mailboxToBlock = ref('');
const currentItem = ref({ email: '', id: '' });
const error = ref('');

onMounted(async () => {
  store.dispatch('updateCurrentPage', 'Block List');
  store.dispatch('updateSkipLimit', { skip: 0, limit: 10 });
  store.dispatch('openCloseSidebar', false);
  await refresh();
});

async function refresh() {
  loading.value = true;
  await load('emails', { directory: 'BlockList', skip: store.state.skip, limit: store.state.limit });
  blockList.value = store.state.emails;
  if (!blockList.value || !blockList.value.length) error.value = `${store.state.currentPage} is Empty!`;
  loading.value = false;
}

async function next() {
  if (store.state.count <= store.state.skip + 10) return;
  store.dispatch('updateSkipLimit', { skip: store.state.skip + 10, limit: store.state.limit });
  await refresh();
}

async function previous() {
  if (store.state.skip <= 0) return;
  store.dispatch('updateSkipLimit', { skip: store.state.skip - 10, limit: store.state.limit });
  await refresh();
}

function openDialog(mode, item = {}) {
  if (mode == 'add') dialogMode.value = 'add';
  if (mode == 'unblock') dialogMode.value = 'unblock';
  currentItem.value = item;
  prompt.value = true;
}

function closeDialog() {
  dialogMode.value = 'add';
  currentItem.value = {};
  prompt.value = false;
}

async function confirm() {
  if (dialogMode.value == 'unblock') {
    await unblock(currentItem.value);
    await refresh();
  }
  if (dialogMode.value == 'add') {
    await block({ email: mailboxToBlock.value, type: 'own_mailbox' });
    await refresh();
  }
  dialogMode.value = 'add';
  currentItem.value = {};
  prompt.value = false;
}
</script>

