<template>
  <div class="q-mt-sm sd-center text-bold text-purple" style="font-size: 20px">
    <q-item>
      <q-item-section avatar>
        <q-icon :name="store.state.editMode == 'Compose' ? 'edit' : 'reply'" size="md" />
      </q-item-section>
      <q-item-section> {{ store.state.editMode == 'Compose' ? 'Compose' : 'Reply' }} </q-item-section>
      <q-item-section avatar>
        <q-btn outline round color="green" icon="send" size="md" @click="send">
          <q-tooltip class="bg-green text-white"> Send </q-tooltip>
        </q-btn>
      </q-item-section>
      <q-item-section avatar>
        <q-btn outline round color="black" icon="clear" size="md" @click="clear">
          <q-tooltip> Clear </q-tooltip>
        </q-btn>
      </q-item-section>
    </q-item>
    <q-separator class="bg-grey-4 q-mt-md q-mx-md" />
  </div>
  <div class="sd-center q-mt-sm q-px-md">
    <q-input v-model="from" label="From" />
    <q-input v-model="to" label="To" class="q-mt-sm" />
    <q-input v-model="subject" label="Subject" :class="isPC ? 'q-mt-sm q-mb-lg' : 'q-mt-sm q-mb-sm'" />
    <q-input v-if="!isPC" borderless v-model="message" type="textarea" rows="20" label="Message" />
  </div>
  <div class="sd-center q-px-sm">
    <q-editor v-if="isPC" v-model="message" ref="editorRef" min-height="300px" max-height="300px" flat placeholder="Message" @paste="onPaste" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';
import DOMPurify from 'dompurify';
import getServerData from '../util/getServerData';

const router = useRouter();
const store = useStore();
const $q = useQuasar();
const editorRef = ref(null);
const { sendMail } = getServerData();

const isPC = $q.platform.is.mobile ? false : true;
const error = ref('');
const from = ref('');
const to = ref('');
const subject = ref('');
const message = ref('');

onMounted(() => {
  if (store.state.editMode == 'Reply') {
    from.value = store.state.currentMessage.to;
    to.value = store.state.currentMessage.from;
    subject.value = `RE: ${store.state.currentMessage.subject}`;
    message.value = `\r\n\r\n\r\n\r\n<br/><br/><br/><br/><br/><br/>----------------------------------------------------------------<br/><br/>\r\n\r\n${DOMPurify.sanitize(store.state.currentMessage.message)}`;
  }
});

function clear() {
  from.value = to.value = subject.value = message.value = error.value = '';
  store.dispatch('updateEditMode', 'Compose');
}

async function send() {
  await sendMail({ from: from.value, to: to.value, subject: subject.value, message: DOMPurify.sanitize(message.value) });
}

function onPaste(evt) {
  // Let inputs do their thing, so we don't break pasting of links.
  if (evt.target.nodeName === 'INPUT') return;
  let text, onPasteStripFormattingIEPaste;
  evt.preventDefault();
  evt.stopPropagation();
  if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
    text = evt.originalEvent.clipboardData.getData('text/plain');
    editorRef.value.runCmd('insertText', text);
  } else if (evt.clipboardData && evt.clipboardData.getData) {
    text = evt.clipboardData.getData('text/plain');
    editorRef.value.runCmd('insertText', text);
  } else if (window.clipboardData && window.clipboardData.getData) {
    if (!onPasteStripFormattingIEPaste) {
      onPasteStripFormattingIEPaste = true;
      editorRef.value.runCmd('ms-pasteTextOnly', text);
    }
    onPasteStripFormattingIEPaste = false;
  }
}
</script>
