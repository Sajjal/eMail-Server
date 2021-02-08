<template>
  <div>
    <q-list dark separator>
      <q-banner dense rounded class="bg-grey-4 text-black" v-if="emails.length < 1">
        <template v-slot:avatar>
          <q-icon name="report" />
        </template>
        No Data Available.
      </q-banner>
      <div v-else>
        <q-infinite-scroll @load="onLoad" :offset="250">
          <q-item clickable v-ripple v-for="email in emails" :key="email._id">
            <q-item-section @click="handleClick(email._id)">
              <q-item-label>
                {{ email.from }}
                <span class="absolute-right q-pa-sm text-caption" v-if="$q.screen.width > 450"> {{ new Date(email.date).toLocaleString() }}</span>
              </q-item-label>
              <q-item-label caption v-if="$q.screen.width <= 450">{{ new Date(email.date).toLocaleString() }}</q-item-label>
              <q-item-label caption> {{ email.subject }}</q-item-label>
            </q-item-section>
          </q-item>

          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </div>
    </q-list>
  </div>
</template>

<script>
import readWriteData from '../composables/readWriteData';

export default {
  data() {
    return {
      emails: [],
      limit: 20,
      skip: 10
    };
  },
  mounted() {
    this.limit = 20;
    this.skip = 10;
    if (this.$store.state.emails.data) this.emails = this.$store.state.emails.data;
  },

  methods: {
    async handleClick(id) {
      let directory = this.$route.name;
      if (directory == 'Search') directory = this.$route.params.directory;
      await readWriteData().getSingleEmail(directory, id);
      this.$router.push({ name: 'Email' });
    },
    //infinite scroll
    async onLoad(index, done) {
      let length = '';
      let count = '';
      let updatedData = '';
      let response = '';
      let directory = this.$route.name;
      let searchTerm = this.$store.state.search.searchTerm;

      length = this.$store.state.emails.data.length;
      count = this.$store.state.emails.count;

      if (length < count) {
        if (searchTerm) {
          directory = this.$store.state.search.directory;
          response = await readWriteData().getEmails('search', { directory, searchTerm, skip: this.skip, limit: this.limit, scroll: true });
          updatedData = [...this.$store.state.emails.data, ...response.data.data];
          this.emails = updatedData;
          this.$store.dispatch('updateEmailList', updatedData);
          this.skip = this.limit;
          this.limit = this.limit + 10;
        } else {
          response = await readWriteData().getEmails('emails', { directory, skip: this.skip, limit: this.limit, scroll: true });
          updatedData = [...this.$store.state.emails.data, ...response.data];
          this.emails = updatedData;
          this.$store.dispatch('updateEmailList', updatedData);
          this.skip = this.limit;
          this.limit = this.limit + 10;
        }

        return done();
      }

      return done();
    }
  }
};
</script>

<style></style>
