<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HeroCard from '@/components/HeroCard.vue'
import Auth from '@/components/Auth.vue'
import { supabase } from '@/lib/supabaseClient'
import type { Session } from '@supabase/supabase-js'

const session = ref()
const isLoading = ref(true)
const userId = ref()

const initAuth = async () => {
  try {
    const { data } = await supabase.auth.getSession()
    session.value = data.session

    await supabase.auth.onAuthStateChange((_: unknown, _session: Session | null) => {
      session.value = _session
    })
  } catch (err) {
    console.error(err)
  }
}

const getUserId = async () => {
  const {
    data: { user }
  } = await supabase.auth.getUser()
  userId.value = user?.id
}

onMounted(async () => {
  await initAuth()
  await getUserId()

  isLoading.value = false
})
</script>

<template>
  <h2 class="logo">smOk</h2>
  <main :class="{ 'loader-wrapper': isLoading }">
    <q-spinner v-if="isLoading" color="primary" size="3em" />
    <Auth v-else-if="!isLoading && !session && !userId" />
    <HeroCard v-else-if="!isLoading && session && userId" :userId />
  </main>
</template>

<style lang="scss" scoped>
.logo {
  margin: 20px;
}

.loader-wrapper {
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
