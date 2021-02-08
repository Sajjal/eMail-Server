<template>
  <div class="column">
    <q-input dark dense filled bottom-slots v-model="from" label="From">
      <template v-slot:append>
        <q-icon name="close" @click="from = ''" class="cursor-pointer" />
      </template>
    </q-input>

    <q-input dark dense filled bottom-slots v-model="to" label="To">
      <template v-slot:append>
        <q-icon name="close" @click="to = ''" class="cursor-pointer" />
      </template>
    </q-input>

    <q-input dark dense filled bottom-slots v-model="subject" label="Subject">
      <template v-slot:append>
        <q-icon name="close" @click="subject = ''" class="cursor-pointer" />
      </template>
    </q-input>
    <textarea v-model="message" required style="height:300px; outline:none" class="bg-grey-10 text-white q-pa-sm"></textarea>
    <q-btn color="primary" icon-right="send" label="Send" class="q-mt-md" @click="handleSubmit" />
  </div>
</template>

<script>
import readWriteData from '../composables/readWriteData';
export default {
  data() {
    return {
      from: '',
      to: '',
      subject: '',
      message: ''
    };
  },
  mounted() {
    this.from = this.to = this.subject = this.message = '';
    if (this.$route.name == 'Reply') {
      this.from = this.$store.state.singleEmail.to;
      this.to = this.$store.state.singleEmail.from;
      this.subject = `RE: ${this.$store.state.singleEmail.subject}`;
      this.message = `\r\n\r\n\r\n\r\n<br/><br/>--------------------------------<br/><br/>\r\n\r\n${this.$store.state.singleEmail.message}`;
    }
  },
  methods: {
    async handleSubmit() {
      await readWriteData().sendEmail({ from: this.from, to: this.to, subject: this.subject, message: this.message.toString(), date: Date.now() });
      this.$router.push({ name: 'Inbox' });
    }
  }
};
</script>
