<!-- Keyboard -->
<template>
  <div class="grid grid-cols-5 gap-2 sm:grid-cols-7 md:grid-cols-9">
    <button v-for="letter in letters" :key="letter" :class="getButtonClass(letter)" :disabled="disabled"
      @click="selectLetter(letter)">
      {{ letter }}
    </button>
  </div>
</template>

<!-- Script Setup -->
<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean
  selectedAnswer?: string | null
  correctAnswer?: string
}>()

const emit = defineEmits<{
  answer: [letter: string]
}>()

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const getButtonClass = (letter: string) => {
  if (!props.selectedAnswer) {
    return 'btn btn-lg btn-letter shadow-xl'
  }

  if (letter === props.correctAnswer) {
    return 'btn btn-success btn-lg'
  }

  if (letter === props.selectedAnswer) {
    return 'btn btn-error btn-lg'
  }

  return 'btn btn-lg btn-disabled'
}

const selectLetter = (letter: string) => {
  if (props.disabled) {
    return
  }

  emit('answer', letter)
}
</script>