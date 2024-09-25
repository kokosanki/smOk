<template>
  <div class="hero-card">
    <InputLabeled
      v-for="item in heroData"
      :key="item.id"
      :type="item.type"
      :id="item.id"
      :label="item.label"
      :basis="item.basis"
      :modifier="item.modifier"
      v-model:inputData="item.value"
      v-model:maxValue="item.maxValue"
    />
    <q-btn outline color="primary" @click="submit">Submit</q-btn>
  </div>
</template>

<script setup lang="ts">
import InputLabeled from '@/components/blocks/InputLabeled.vue'
import type { HeroData } from "@/components/HeroCard.types"
import { reactive } from 'vue'


const heroData: Record<string, HeroData> = reactive({
  name: {
    id: 'name',
    value: '',
    label: 'Imię',
    type: 'text'
  },
  race: {
    id: 'race',
    value: '',
    label: 'Rasa',
    type: 'text'
  },
  archetype: {
    id: 'archetype',
    value: '',
    label: 'Archetyp',
    type: 'text'
  },
  level: {
    id: 'level',
    value: 2,
    label: 'Level',
    type: 'number'
  },
  experience: {
    id: 'experience',
    value: 100,
    label: 'Doświadczenie',
    type: 'number'
  },
  strength: {
    id: 'strength',
    value: 0,
    label: 'Siła',
    type: 'number'
  },
  dexterity: {
    id: 'dexterity',
    value: 0,
    label: 'Sprawność',
    type: 'number'
  },
  speed: {
    id: 'speed',
    value: 0,
    label: 'Szybkość',
    type: 'number'
  },
  get movement(): HeroData {
    return {
      id: 'movement',
      value: 0,
      basis: this.speed.value,
      modifier: 3,
      label: 'Ruch',
      type: 'number'
    }
  },
  magic: {
    id: 'magic',
    value: 0,
    label: 'Magia',
    type: 'number'
  },
  armour: {
    id: 'armour',
    value: 0,
    maxValue: 0,
    label: 'Zbroja',
    type: 'number'
  },
  wound: {
    id: 'wound',
    value: 0,
    label: 'Rana',
    type: 'number'
  },
  gold: {
    id: 'gold',
    value: 0,
    label: 'Złoto',
    type: 'number'
  },
  ammunition: {
    id: 'ammunition',
    value: 0,
    label: 'Amunicja',
    type: 'number'
  },
  torch: {
    id: 'torch',
    value: 0,
    label: 'Pochodnie',
    type: 'number'
  },
  mana: {
    id: 'mana',
    value: 0,
    maxValue: 0,
    label: 'Mana',
    type: 'number'
  },
  hp: {
    id: 'hp',
    value: 0,
    maxValue: 0,
    label: 'Życie',
    type: 'number'
  },
  resources: {
    id: 'resources',
    value: 0,
    maxValue: 0,
    label: 'Zapasy',
    type: 'number'
  },
  tools: {
    id: 'tools',
    value: 0,
    maxValue: 0,
    label: 'Narzędzia',
    type: 'number'
  },
  components: {
    id: 'components',
    value: 0,
    maxValue: 0,
    label: 'Komponenty',
    type: 'number'
  },
  backpack: {
    id: 'backpack',
    value: 0,
    maxValue: 0,
    label: 'Plecak',
    type: 'number'
  },
  knife: {
    id: 'knife',
    value: true,
    label: 'Nóż',
    type: 'boolean'
  }
})

const submit = (): void => {}

</script>