<template>
  <section id="board"
           class="bg-gray-900 border border-gray-800 flex flex-col gap-4 p-4 min-w-96 rounded-xl overflow-y-auto">
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-1">
        <div class="flex gap-2 items-center">
          <span id="status" class="rounded-full"></span>
          <h1 class="font-bold text-lg text-white">{{ board.titulo }}</h1>
        </div>
        <span class="text-sm text-gray-400">{{ board.descricao }}</span>
      </div>
      <div class="flex gap-3 items-center">
        <p class="bg-purple-600 flex items-center justify-center rounded-full w-6 h-6 text-sm text-white font-semibold">
          {{ board.itensBoard.length }}
        </p>
        <button class="flex items-center" @click="abrirOpcoesBoard">
          <i class="pi pi-ellipsis-v text-gray-50" style="font-size: 1rem"></i>
        </button>
      </div>
    </div>

    <div
        v-if="isExibirActions"
        class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <ActionsBoard
          :board="props.board"
          @form-fechado="handleActionBoard"
      />
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
        <div
            class="bg-gray-800 border border-gray-700 hover:border-purple-600 transition-colors shadow rounded-lg p-3 w-full cursor-move">
          <p class="font-semibold text-white">{{ element.titulo }}</p>
          <p class="text-sm text-gray-400">{{ element.descricao }}</p>
        </div>
      </template>
    </draggable>
  </section>
</template>

<script setup lang="ts">
import draggable from "vuedraggable"
import {type PropType, ref} from "vue"
import type {IBoard} from "@/types/interfaces/types.ts";
import ActionsBoard from "@/components/kanban/ActionsBoard.vue";

const props = defineProps({
  board: {
    type: Object as PropType<IBoard>,
    required: true,
  }
})

const emit = defineEmits(["acao-realizada"])
const isExibirActions = ref<boolean>(false);
const itens = ref([...props.board.itensBoard])

const abrirOpcoesBoard = () => {
  isExibirActions.value = !isExibirActions.value
}

const handleActionBoard = () => {
  emit("acao-realizada");
  abrirOpcoesBoard();
}
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
