<script setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient.js'

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value
    })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <q-form @submit.prevent="handleLogin" class="row flex-center flex">
    <q-col cols="6" class="form-widget">
      <h2 class="header">Supabase + Vue 3</h2>
      <p class="description">Sign in via magic link with your email below</p>
      <q-input v-model="email" class="inputField" type="email" placeholder="Your email" required />
      <q-btn
        type="submit"
        class="button block q-mt-md"
        :label="loading ? 'Loading' : 'Send magic link'"
        :disable="loading"
      />
    </q-col>
  </q-form>
</template>
