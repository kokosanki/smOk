<template>
  <div class="hero-card">
    <template v-for="item in heroData" :key="item.id">
      <InputLabeled
        v-if="typeof item.value !== 'object'"
        :type="item.type"
        :id="item.id"
        :label="item.label"
        :basis="item.basis"
        :modifier="item.modifier"
        :lengthy="item.lengthy"
        v-model:inputData="item.value"
        v-model:maxValue="item.maxValue"
      />
      <div v-else>
        <label>{{ item.label }}</label>
        <q-checkbox
          v-for="(val, key) in item.value"
          :key
          v-model="item.value[key]"
          :id="item.label + key"
          name="id"
        />
      </div>
    </template>
    <div class="hero-card__sticky-button-wrapper">
      <q-btn fab icon="fa-solid fa-save" color="primary" @click="submit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import InputLabeled from '@/components/blocks/InputLabeled.vue'
import type { HeroData } from '@/components/HeroCard.types'
import { HeroDataModel } from '@/models/HeroCard.model'
import { onMounted, reactive } from 'vue'
import { supabase } from '@/lib/supabaseClient.js'

interface Props {
  userId: string
}

const props = defineProps<Props>()

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
    value: [false, true, true, true, false, false],
    label: 'Zapasy',
    type: 'number'
  },
  tools: {
    id: 'tools',
    value: [false, false, false],
    label: 'Narzędzia',
    type: 'number'
  },
  components: {
    id: 'components',
    value: [false, false, false],
    label: 'Komponenty',
    type: 'number'
  },
  backpack: {
    id: 'backpack',
    value: '',
    label: 'Plecak',
    type: 'text',
    lengthy: true
  },
  proficiency: {
    id: 'proficiency',
    value: '',
    label: 'Biegłości do nauczenia',
    type: 'text',
    lengthy: true
  },
  proficiency_to_be_learned: {
    id: 'proficiency_to_be_learned',
    value: '',
    label: 'Biegłości',
    type: 'text',
    lengthy: true
  },
  expertise: {
    id: 'expertise',
    value: '',
    label: 'Ekspertyzy',
    type: 'text',
    lengthy: true
  },
  expertise_to_be_learned: {
    id: 'expertise_to_be_learned',
    value: '',
    label: 'Ekspertyzy  do nauczenia',
    type: 'text',
    lengthy: true
  },
  notes: {
    id: 'notes',
    value: '',
    label: 'Notatki',
    type: 'text',
    lengthy: true
  },
  knife: {
    id: 'knife',
    value: true,
    label: 'Nóż',
    type: 'boolean'
  },
  inspiration: {
    id: 'inspiration',
    value: true,
    label: 'Inspiracja',
    type: 'boolean'
  }
})

const submit = (): void => {
  const payload = new HeroDataModel(heroData, props.userId)
  setHero(payload)
}

const assignHeroDataValues = (data: Record<string, any>): void => {
  for (const key in data) {
    if (heroData[key]) {
      heroData[key].value = data[key].value
    }
  }
}

const setHero = async (payload: HeroDataModel): Promise<void> => {
  try {
    await supabase.from('herodata').upsert(payload)
  } catch (err) {
    console.error(err)
    alert('Something went wrong, please refresh the page and try again.')
  }
}

const fetchAndAssignHeroData = async (): Promise<void> => {
  try {
    const { data } = await supabase.from('herodata').select().eq('user_id', props.userId)
    assignHeroDataValues(data[0])
  } catch (err) {
    console.error(err)
    alert('Something went wrong, please refresh the page.')
  }
}

onMounted(async () => {
  await fetchAndAssignHeroData()
})
</script>

<style lang="scss" scoped>
.hero-card {
  margin: 20px;

  &__sticky-button-wrapper {
    position: sticky;
    bottom: 30px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
