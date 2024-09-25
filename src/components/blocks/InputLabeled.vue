<template>
  <div class="input-labeled">
    <q-checkbox v-if="isInputBoolean" v-model="modifiedInputData" :id :label name="id" />
    <div v-else-if="type === 'number' && basis !== undefined">
      <p>{{ label }}: {{ Number(basis) + Number(modifier!) }}</p>
    </div>
    <div
      class="input-labeled__wrapper"
      v-else-if="type !== 'boolean' && typeof modifiedInputData !== 'boolean'"
    >
      <q-input
        class="input-labeled__input"
        :type
        :id
        :label
        name="id"
        v-model="modifiedInputData"
        :disabled
        @blur="limitData"
        :rules
      />
      <div v-if="shouldDisplayMax" class="input-labeled__max">
        <q-input
          class="input-labeled__limiter"
          :type
          :id
          :disabled
          :label="'Max ' + label"
          name="id"
          v-model.number="maxValue"
          @blur="limitData"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type InputData = string | number | boolean | undefined

const inputData = defineModel<InputData>('inputData')
const maxValue = defineModel<number>('maxValue')

interface Props {
  type: 'text' | 'number' | 'boolean'
  id: string
  label: string
  disabled?: boolean
  modifier?: number
  calculatingBase?: number
  basis?: number
}

const emit = defineEmits(['update:inputData'])

const props = defineProps<Props>()

const isInputBoolean = computed(
  () => props.type === 'boolean' && typeof modifiedInputData.value === 'boolean'
)

const limitData = (): void => {
  if (
    maxValue.value !== undefined &&
    typeof modifiedInputData.value === 'number' &&
    modifiedInputData.value > maxValue.value
  ) {
    modifiedInputData.value = maxValue.value
  }
}

const rules = [
  (val: any) => (val !== 'undefined' && val !== null && val !== '') || 'Value cannot be empty',
  (val: any) => {
    if (maxValue.value) {
      return val <= Number(maxValue.value) || 'Input must be lower or equal to the max value'
    }
  }
]

const shouldDisplayMax = computed(() => {
  return maxValue.value !== undefined
})

const calculateFromBase = (): number => {
  const modifier = props.modifier !== undefined ? props.modifier : 0
  return props.calculatingBase! + modifier
}

const checkAndConditionallyModifyValue = (newValue: InputData): InputData => {
  return typeof newValue === 'number' && props.type === 'number' && props.modifier !== undefined
    ? newValue + props.modifier
    : newValue
}

const modifiedInputData = computed({
  get(): InputData {
    return props.disabled && props.calculatingBase ? calculateFromBase() : inputData.value
  },
  set(newValue: InputData) {
    let value = checkAndConditionallyModifyValue(newValue)
    emit('update:inputData', value)
  }
})
</script>

<style lang="scss">
.input-labeled {
  margin-bottom: 10px;
  position: relative;

  &__wrapper {
    > * {
      width: 50%;
    }

    &:has(.input-labeled__max) {
      width: 100%;
      display: flex;
      gap: 20px;
    }
  }

  &__label,
  &__input {
    display: block;
  }

  &__label {
    font-size: 12px;
    font-weight: 400;
  }

  &__error {
    font-size: 10px;
    position: absolute;
    top: -8px;
    color: red;
  }

  &__item {
    display: flex;
  }
}
</style>
