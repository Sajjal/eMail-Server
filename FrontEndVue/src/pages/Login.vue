<template>
  <div class="q-mt-sm sd-center text-bold text-purple" style="font-size: 20px">
    <q-item>
      <q-skeleton type="QToggle" class="q-mr-md" width="40px" />
      <q-item-section>
        <q-skeleton type="QToolbar" height="40px" />
      </q-item-section>

      <q-item-section side>
        <q-skeleton type="QRadio" class="q-ml-md" height="40px" width="40px" />
      </q-item-section>
    </q-item>
    <q-separator class="bg-grey-4 q-mt-md q-mx-md" />
  </div>

  <div class="sd-center q-mt-md">
    <q-list style="max-width: 1000px" v-for="i in 5" :key="i">
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="QRadio" height="40px" width="40px" />
        </q-item-section>

        <q-item-section>
          <q-skeleton type="QToolbar" height="40px" />
        </q-item-section>

        <q-item-section side>
          <q-skeleton type="QToolbar" height="40px" width="90px" />
        </q-item-section>
      </q-item>
      <q-separator spaced />
    </q-list>
  </div>

  <q-dialog v-model="unauthorized" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Please Enter the Access Code</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="accessCode" autofocus @keyup.enter="userLogin" />
      </q-card-section>

      <q-card-section class="q-pt-none" v-if="loginError">
        <div class="text-negative">{{ loginError }}</div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Submit" @click="userLogin" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import getServerData from '../util/getServerData';

const store = useStore();
const router = useRouter();

const { isLoggedIn } = store.state;
const { loginError, login } = getServerData();

const unauthorized = ref(true);
const accessCode = ref('');

async function userLogin() {
  await login({ accessCode: accessCode.value });
  if (!loginError.value) unauthorized.value = false;
}
</script>