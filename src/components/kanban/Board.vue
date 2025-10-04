<template>
  <section id="board" class="bg-gray-50 flex flex-col gap-4 p-4 min-w-96 rounded-xl overflow-y-auto">
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-1">
        <div class="flex gap-2 items-center">
          <span id="status" class="rounded-full"></span>
          <h1 class="font-bold text-lg">{{ titulo }}</h1>
        </div>
        <span class="text-sm text-gray-600">{{ descricao }}</span>
      </div>
      <p class="bg-gray-300 flex items-center justify-center rounded-full w-6 h-6 text-sm">
        {{ itensBoard.length }}
      </p>
    </div>

    <draggable
        v-model="itens"
        group="kanban"
        item-key="id"
        class="flex flex-col gap-3"
        ghost-class="opacity-50"
        drag-class="shadow-lg"
    >
      <template #item="{ element }">
        <div class="bg-white shadow rounded-lg p-3 w-full cursor-move">
          <p class="font-semibold">{{ element.titulo }}</p>
          <p class="text-sm text-gray-600">{{ element.descricao }}</p>
        </div>
      </template>
    </draggable>
  </section>
</template>

<script setup lang="ts">
import {ref} from "vue"
import draggable from "vuedraggable"
import type {ItemBoard} from "@/types/interfaces/types.ts";

const props = defineProps({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  itensBoard: {
    type: Array as () => Array<ItemBoard>,
    required: true,
  },
})

const itens = ref([...props.itensBoard])
</script>

<style scoped>
#board {
  min-height: 500px;
  max-height: 500px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

#board::-webkit-scrollbar {
  display: none;
}

#status {
  height: 14px;
  width: 14px;
  background-color: aquamarine;
}
</style>
