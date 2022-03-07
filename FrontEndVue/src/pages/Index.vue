<template>
  <div class="q-mt-sm sd-center text-bold text-purple" style="font-size: 20px">
    <q-item>
      <q-item-section avatar @click="readMessage = false" style="cursor: pointer">
        <q-icon :name="icons[store.state.currentPage]" size="md" />
      </q-item-section>
      <q-item-section class="gt-xs" @click="readMessage = false" style="cursor: pointer"> {{ store.state.currentPage }} </q-item-section>

      <q-item-section class="gt-sm" v-if="!readMessage && store.state.count" style="font-size: 14px">
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

      <q-item-section>
        <q-input dense outlined v-model="searchTerm" @keyup.enter="onSearch">
          <template v-slot:append>
            <q-icon v-if="searchTerm === ''" name="search" class="text-black" />
            <q-icon v-else name="clear" class="cursor-pointer text-black" @click="searchTerm = ''" />
          </template>
        </q-input>
      </q-item-section>

      <q-item-section avatar v-if="!readMessage">
        <q-btn outline round :loading="loading" color="primary" icon="sync" size="md" @click="refresh">
          <template v-slot:loading>
            <q-spinner-pie />
          </template>
          <q-tooltip class="bg-primary text-white"> Refresh </q-tooltip>
        </q-btn>
      </q-item-section>
    </q-item>
    <q-separator v-if="!readMessage" class="bg-grey-4 q-mx-md lt-md" />
    <q-item class="lt-md" v-if="!readMessage && store.state.count" style="font-size: 14px">
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

  <div v-if="!readMessage" class="sd-center q-mt-md">
    <q-list style="max-width: 1000px">
      <q-scroll-area style="height: 69vh">
        <q-item v-if="error">
          <q-item-section>
            <q-item-label lines="1">
              <span class="text-subtitle2"> {{ error }} </span>
            </q-item-label>
          </q-item-section>
        </q-item>

        <div v-else v-for="email in emails" :key="email._id">
          <q-item>
            <q-item-section avatar>
              <q-avatar :color="email.isNew ? 'green' : 'grey'" text-color="white"> {{ email.from ? email.from.replace(/[^a-z0-9,. ]/gi, '').charAt(0) : 'S' }} </q-avatar>
            </q-item-section>

            <q-item-section @click="read(email._id)" style="cursor: pointer">
              <q-item-label lines="1">
                <span :class="email.isNew ? 'text-purple text-bold' : 'text-grey-8 text-bold'"> {{ email.from ? email.from.split('<')[0].replace(/[^a-z0-9,. ]/gi, '') : '' }} </span>
              </q-item-label>
              <q-item-label caption lines="2">
                {{ date.formatDate(email.date, 'ddd, DD MMM YYYY,  hh:mm A') }} -- <span class="text-weight-bold"> {{ email.subject }} </span>
              </q-item-label>
            </q-item-section>

            <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn :class="email.star ? 'gt-xs text-yellow-10' : 'gt-xs'" size="12px" flat dense round icon="star" @click="email.star ? unstar(email._id) : star(email._id)">
                  <q-tooltip> Star </q-tooltip>
                </q-btn>
                <q-btn class="gt-xs" size="12px" flat dense round icon="done" v-if="email.isNew" @click="readMark(email._id)"> <q-tooltip> Mark as Read </q-tooltip> </q-btn>
                <q-btn v-if="store.state.currentPage != 'Trash'" class="gt-xs" size="12px" flat dense round icon="delete" @click="trash(email._id)"> <q-tooltip> Move to Trash </q-tooltip> </q-btn>
                <q-btn v-if="store.state.currentPage == 'Trash'" class="gt-xs text-negative" size="12px" flat dense round icon="delete_forever" @click="trash(email._id)">
                  <q-tooltip> Delete Permanently </q-tooltip>
                </q-btn>
                <q-btn size="12px" class="lt-sm" flat dense round icon="more_vert">
                  <q-menu fit>
                    <q-item clickable @click="email.star ? unstar(email._id) : star(email._id)">
                      <q-item-section> <q-icon name="star" :color="email.star ? 'yellow-10' : ''" size="sm" /> </q-item-section>
                    </q-item>
                    <q-item v-if="email.isNew" clickable @click="readMark(email._id)">
                      <q-item-section> <q-icon name="done" class="text-black" size="sm" clickable /> </q-item-section>
                    </q-item>
                    <q-item clickable v-if="store.state.currentPage != 'Trash'" @click="trash(email._id)">
                      <q-item-section> <q-icon name="delete" class="text-black" size="sm" clickable /> </q-item-section>
                    </q-item>
                    <q-item clickable v-if="store.state.currentPage == 'Trash'" @click="trash(email._id)">
                      <q-item-section> <q-icon name="delete_forever" class="text-negative" size="sm" clickable /> </q-item-section>
                    </q-item>
                  </q-menu>
                </q-btn>
              </div>
            </q-item-section>
          </q-item>
          <q-separator spaced />
        </div>
      </q-scroll-area>
    </q-list>
  </div>

  <div v-else class="sd-center">
    <q-item>
      <q-item-section>
        <span class="text-bold" style="font-size: 18px"> {{ store.state.currentMessage.from ? store.state.currentMessage.from.split('<')[0].replace(/[^a-z0-9,. ]/gi, '') : '' }} </span>
        <q-item-label caption class="q-mt-xs"> {{ date.formatDate(store.state.currentMessage.date, 'dddd, DD MMM YYYY,  hh:mm A') }} </q-item-label>
      </q-item-section>

      <q-item-section avatar v-if="store.state.currentPage == 'Inbox'">
        <q-btn outline round color="green" icon="reply" size="md" @click="reply">
          <q-tooltip class="bg-green text-white"> Reply </q-tooltip>
        </q-btn>
      </q-item-section>
      <q-item-section avatar>
        <q-btn outline round color="black" icon="arrow_back" size="md" @click="readMessage = false">
          <q-tooltip> Back to {{ store.state.currentPage }} </q-tooltip>
        </q-btn>
      </q-item-section>
    </q-item>

    <q-list style="max-width: 1000px">
      <q-scroll-area style="height: 68vh">
        <q-separator />
        <q-item>
          <q-item-section>
            <q-item-label>
              <span class="q-mr-lg q-pr-lg text-bold">From:</span>
              {{ store.state.currentMessage.from.includes('<') ? store.state.currentMessage.from.split('<')[1].split('>')[0] : store.state.currentMessage.from }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item>
          <q-item-section>
            <q-item-label> <span class="q-mr-xl q-pr-md text-bold">To:</span> {{ store.state.currentMessage.to }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item>
          <q-item-section>
            <q-item-label> <span class="q-mr-sm text-bold">Sender's IP:</span> {{ store.state.currentMessage.sender_ip }} </q-item-label>
          </q-item-section>
          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                :class="store.state.currentMessage.star ? 'gt-xs text-yellow-10' : 'gt-xs'"
                size="12px"
                flat
                dense
                round
                icon="star"
                @click="store.state.currentMessage.star ? unstar(store.state.currentMessage._id) : star(store.state.currentMessage._id)"
              >
                <q-tooltip> Star </q-tooltip>
              </q-btn>
              <q-btn v-if="store.state.currentPage != 'Trash'" class="gt-xs" size="12px" flat dense round icon="delete" @click="trash(store.state.currentMessage._id)"> <q-tooltip> Move to Trash </q-tooltip> </q-btn>
              <q-btn v-if="store.state.currentPage == 'Trash'" class="gt-xs text-negative" size="12px" flat dense round icon="delete_forever" @click="trash(store.state.currentMessage._id)">
                <q-tooltip> Delete Permanently </q-tooltip>
              </q-btn>
              <q-btn size="12px" flat dense round icon="more_vert" class="lt-sm">
                <q-menu fit>
                  <q-item clickable @click="store.state.currentMessage.star ? unstar(store.state.currentMessage._id) : star(store.state.currentMessage._id)">
                    <q-item-section> <q-icon name="star" :class="store.state.currentMessage.star ? 'gt-xs text-yellow-10' : 'gt-xs'" size="sm" /> </q-item-section>
                  </q-item>
                  <q-item clickable v-if="store.state.currentPage != 'Trash'" @click="trash(store.state.currentMessage._id)">
                    <q-item-section> <q-icon name="delete" class="text-black" size="sm" clickable /> </q-item-section>
                  </q-item>
                  <q-item clickable v-if="store.state.currentPage == 'Trash'" @click="trash(store.state.currentMessage._id)">
                    <q-item-section> <q-icon name="delete_forever" class="text-negative" size="sm" clickable /> </q-item-section>
                  </q-item>
                </q-menu>
              </q-btn>
            </div>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item>
          <q-item-section>
            <q-item-label>
              <span class="text-bold text-purple" :style="isPC ? 'font-size:16px;' : ''"> {{ store.state.currentMessage.subject }} </span>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-responsive :ratio="1">
          <div v-html="DOMPurify.sanitize(store.state.currentMessage.message)"></div>
        </q-responsive>
      </q-scroll-area>
    </q-list>
  </div>

  <q-dialog v-model="confirm" persistent>
    <q-card style="min-width: 250px">
      <q-card-section class="row items-center">
        <q-item>
          <q-item-section top avatar>
            <q-avatar icon="report" color="red" text-color="white" />
          </q-item-section>

          <q-item-section>
            <q-item-label v-if="store.state.currentPage != 'Trash'"> Are You Sure to Move it to the Trash? </q-item-label>
            <q-item-label v-if="store.state.currentPage == 'Trash'"> Are You Sure to Delete it Permanently? </q-item-label>

            <q-item-label caption lines="1" v-if="store.state.currentPage != 'Trash'"> It will be auto-removed from Trash after a Week!</q-item-label>
            <q-item-label caption lines="1" v-if="store.state.currentPage == 'Trash'"> You won't be able to see this Email again!</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset="item" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="cancelTrash" />
        <q-btn flat :label="store.state.currentPage == 'Trash' ? 'Delete' : 'Trash'" color="red" @click="confirmTrash" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useQuasar, date } from 'quasar';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import DOMPurify from 'dompurify';
import getServerData from '../util/getServerData';

const store = useStore();
const router = useRouter();
const $q = useQuasar();
const { load, fullEmail, addStar, removeStar, markAsRead, toTrash } = getServerData();

const isPC = $q.platform.is.mobile ? false : true;
const emails = ref([]);
const loading = ref(false);
const searchTerm = ref('');
const readMessage = ref(false);
const icons = { Inbox: 'mail', Starred: 'star', Sent: 'send', Trash: 'delete' };
const error = ref('');
const confirm = ref(false);
const msgToDelete = ref('');

onMounted(async () => {
  await refresh();
  store.dispatch('updateEditMode', 'Compose');
});

watch(
  () => store.state.currentPage,
  async function () {
    searchTerm.value = '';
    error.value = '';
    await refresh();
  }
);

async function refresh() {
  loading.value = true;
  readMessage.value = false;
  await load('emails', { directory: store.state.currentPage, skip: store.state.skip, limit: store.state.limit });
  emails.value = store.state.emails;
  if (!emails.value || !emails.value.length) error.value = `${store.state.currentPage} is Empty!`;
  loading.value = false;
}

async function read(id) {
  await fullEmail({ directory: store.state.currentPage, id });
  readMessage.value = true;
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

async function reply() {
  store.dispatch('updateEditMode', 'Reply');
  store.dispatch('updateCurrentPage', 'Compose');
  router.push({ name: 'Compose' });
}

async function onSearch() {
  error.value = '';
  loading.value = true;
  readMessage.value = false;
  store.dispatch('updateSkipLimit', { skip: 0, limit: 10 });
  await load('search', { searchTerm: searchTerm.value, directory: store.state.currentPage, skip: store.state.skip, limit: store.state.limit });
  emails.value = store.state.emails;
  if (emails.value && !emails.value.length) error.value = `No Result Found for ${searchTerm.value} in ${store.state.currentPage}`;
  loading.value = false;
}

function trash(id) {
  msgToDelete.value = id;
  confirm.value = true;
}

async function confirmTrash() {
  if (!msgToDelete.value) return;
  await toTrash({ directory: store.state.currentPage, id: msgToDelete.value });
  if (store.state.count < store.state.skip + 10) store.dispatch('updateSkipLimit', { skip: 0, limit: 10 });
  await refresh();
  msgToDelete.value = '';
  confirm.value = false;
}

function cancelTrash() {
  msgToDelete.value = '';
  confirm.value = false;
}

async function star(id) {
  await addStar({ directory: store.state.currentPage, id });
  if (store.state.count < store.state.skip + 10) store.dispatch('updateSkipLimit', { skip: 0, limit: 10 });
  await refresh();
}

async function unstar(id) {
  await removeStar({ id });
  if (store.state.count < store.state.skip + 10) store.dispatch('updateSkipLimit', { skip: 0, limit: 10 });
  await refresh();
}

async function readMark(id) {
  await markAsRead({ directory: store.state.currentPage, id });
  await refresh();
}
</script>

