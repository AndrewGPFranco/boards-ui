<template>
  <div
      :class="[
            'p-4 rounded-lg border flex items-center justify-between gap-4 shadow-xl min-w-80',
            {
                'bg-gray-800 border-gray-50 text-white': props.type === 'info',
                'bg-green-600 border-green-400 text-white':
                    props.type === 'success',
                'bg-red-600 border-red-400 text-white': props.type === 'error',
            },
        ]"
  >
    <span>{{ props.message }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});
</script>
