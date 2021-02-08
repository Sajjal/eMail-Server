<template>
  <div class="column">
    <q-input dark filled bottom-slots v-model="input" label="Please Enter the Access Code !">
      <template v-slot:append>
        <q-icon v-if="input === ''" name="lock" />
        <q-icon v-else name="clear" class="cursor-pointer" @click="input = ''" />
      </template>
    </q-input>

    <q-banner dense class="bg-red text-white q-mb-sm" v-if="loginError">
      <template v-slot:avatar>
        <q-icon name="report" />
      </template>
      {{ loginError }}
    </q-banner>

    <q-btn color="primary" icon-right="send" label="Submit" class="q-mt-sm" @click="handleSubmit" />
  </div>
</template>

<script>
import readWriteData from '../composables/readWriteData';
export default {
  data() {
    return {
      input: '',
      loginError: false
    };
  },
  mounted() {
    this.input = '';
    this.loginError = null;
  },
  methods: {
    async handleSubmit() {
      const response = await readWriteData().login(this.input);
      if (response.Error) this.loginError = response.Error;
      else {
        this.loginError = null;
        this.$store.dispatch('updateSearch', {});
        await readWriteData().getEmails('emails', { directory: 'Inbox', skip: 0, limit: 10 });
        this.$router.push({ name: 'Inbox' });
      }
    }
  }
};
</script>

<style></style>
