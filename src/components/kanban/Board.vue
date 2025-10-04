<template>
  <section class="bg-gray-50 flex flex-col gap-4 p-4 min-h-96 min-w-96 rounded-xl">
    <div class="flex  items-center justify-between">
      <div class="flex gap-4 items-center">
        <span class="status rounded-redondo"></span>
        <h1 class="font-bold text-lg">{{ props.titulo }}</h1>
      </div>
      <p class="bg-gray-300 flex items-center justify-center rounded-full w-6 h-6">2</p>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  titulo: {
    type: String,
    required: true,
  }
})
</script>

<style scoped lang="css">
.status {
  height: 14px;
  width: 14px;
  background-color: aquamarine;
}
</style>