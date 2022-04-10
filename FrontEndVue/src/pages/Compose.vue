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
    <q-input v-model="subject" label="Subject" class="q-mt-sm" />
    <q-file v-model="files" label="Attach files" use-chips append multiple max-total-size="25165824" @rejected="onRejected" :filter="checkFileType" :class="isPC ? 'q-mt-sm q-mb-lg' : 'q-mt-sm q-mb-sm'">
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>
    <q-input v-if="!isPC" borderless v-model="message" type="textarea" rows="16" label="Message" />
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
const files = ref(null);

onMounted(() => {
  if (store.state.editMode == 'Reply') {
    from.value = store.state.currentMessage.to;
    to.value = store.state.currentMessage.from;
    subject.value = `RE: ${store.state.currentMessage.subject}`;
    message.value = `\r\n\r\n\r\n\r\n<br/><br/><br/><br/><br/><br/>----------------------------------------------------------------<br/><br/>\r\n\r\n${DOMPurify.sanitize(store.state.currentMessage.message)}`;
  }
});

function checkFileType(files) {
  const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/webp',
    'image/svg',
    'image/vnd.adobe.photoshop',
    'audio/mpeg',
    'application/mp4',
    'video/webm',
    'application/pdf',
    'application/zip',
    'application/x-7z-compressed',
    'application/tar.gz',
    'application/x-font-ttf',
    'application/x-font-woff',
    'application/msword',
    'application/vnd.ms-powerpoint',
    'application/vnd.apple.pages',
    'application/vnd.apple.keynote',
    'application/vnd.apple.numbers',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    'application/vnd.openxmlformats-officedocument.presentationml.template',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.template'
  ];
  return files.filter((file) => whitelist.includes(file.type));
}

function onRejected(rejectedEntries) {
  let message = '';
  if (rejectedEntries[0].failedPropValidation == 'max-total-size') message = `Total file size should be less than 25 MB: ${rejectedEntries[0].file.name}`;
  if (rejectedEntries[0].failedPropValidation == 'filter') message = `Filetype not supported: ${rejectedEntries[0].file.name}`;
  $q.notify({ type: 'negative', message });
}

function clear() {
  from.value = to.value = subject.value = message.value = error.value = '';
  files.value = null;
  store.dispatch('updateEditMode', 'Compose');
}

async function send() {
  const formData = new FormData();
  if (files.value) {
    for (let file in files.value) {
      formData.append('file', files.value[file]);
    }
  }
  formData.append('info', JSON.stringify({ from: from.value, to: to.value, subject: subject.value, message: DOMPurify.sanitize(message.value) }));
  await sendMail(formData);
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
