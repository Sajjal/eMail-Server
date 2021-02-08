<template>
  <div>
    <q-list dark separator>
      <q-item>
        <span class="q-pr-sm text-subtitle2"> From: </span>
        {{ $store.state.singleEmail.from }}
        <span class="absolute-right q-pa-sm text-caption" v-if="$q.screen.width > 450">
          {{ new Date($store.state.singleEmail.date).toLocaleString() }}
        </span>
      </q-item>
      <q-item>
        <span class="q-pr-sm text-subtitle2"> To: </span>
        {{ $store.state.singleEmail.to }}
      </q-item>
      <q-item v-if="$q.screen.width <= 450">
        <span class="q-pr-sm text-subtitle2"> On: </span>
        {{ new Date($store.state.singleEmail.date).toLocaleString() }}
      </q-item>
      <q-item>
        <span class="q-pr-sm text-subtitle2"> Sender IP: </span>
        {{ $store.state.singleEmail.sender_ip }}
      </q-item>
      <q-item>
        <span class="q-pr-sm text-subtitle2"> Subject: </span>
        {{ $store.state.singleEmail.subject }}
        <span class="absolute-right q-pb-md q-pr-lg text-caption">
          <span v-if="$store.state.singleEmail.source == 'Inbox'">
            <q-icon name="reply" size="sm" @click="handleReply" color="secondary" class="q-pt-sm q-pr-sm" style="cursor:pointer">
              <q-tooltip content-class="bg-amber text-black shadow-4" :offset="[10, 10]">
                Reply !
              </q-tooltip>
            </q-icon>
          </span>
          <span v-if="$store.state.singleEmail.source == 'Trash'">
            <q-icon name="delete_forever" size="sm" color="red" @click="confirm = true" class="q-pt-sm" style="cursor:pointer">
              <q-tooltip content-class="bg-amber text-black shadow-4" :offset="[10, 10]">
                Delete Permanently !
              </q-tooltip>
            </q-icon>
          </span>
          <span v-else>
            <q-icon name="delete" size="sm" color="red" @click="confirm = true" class="q-pt-sm" style="cursor:pointer">
              <q-tooltip content-class="bg-amber text-black shadow-4" :offset="[10, 10]">
                Move to Trash !
              </q-tooltip>
            </q-icon>
          </span>
        </span>

        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="report" color="red" text-color="white" />
              <span class="q-ml-sm">Are You Sure to Delete?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn flat label="Delete" color="red" @click="toTrash($store.state.singleEmail._id)" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-item>
      <q-item>
        <q-item-section v-html="$store.state.singleEmail.message" />
      </q-item>
    </q-list>
  </div>
</template>

<script>
import readWriteData from '../composables/readWriteData';
export default {
  data() {
    return {
      confirm: false
    };
  },
  mounted() {
    this.confirm = false;
  },
  methods: {
    handleReply() {
      this.$router.push({ name: 'Reply' });
    },
    async toTrash(id) {
      const directory = this.$store.state.singleEmail.source;
      await readWriteData().toTrash(directory, id);
      this.$router.push({ name: directory });
    }
  }
};
</script>

<style></style>
