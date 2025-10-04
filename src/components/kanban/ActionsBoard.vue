<template>
  <section class="flex flex-col gap-6 border border-gray-700 rounded-xl p-6 w-96 bg-gray-900 shadow-2xl">
    <div class="flex items-center justify-between">
      <h1 class="text-white font-bold text-xl">
        Gerenciar Board
      </h1>
      <button
          @click="avisaFormFechado"
          class="text-gray-400 hover:text-white transition-colors"
          title="Fechar"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <div class="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <p class="text-gray-400 text-sm mb-1">Board atual:</p>
      <p class="text-white font-semibold text-lg">{{ props.board?.titulo }}</p>
    </div>

    <div class="flex flex-col gap-3">
      <h3 class="text-gray-300 font-semibold text-sm uppercase tracking-wide">Ações</h3>

      <button
          @click="excluirBoard"
          class="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-3 rounded-lg transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
        Excluir Board
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import useToast from "@/composables/useToast.ts";
import BoardService from "@/services/BoardService.ts";
import type {IBoard} from "@/types/interfaces/types.ts";

const toast = useToast();
const boardService = new BoardService();
const emit = defineEmits(["form-fechado"])

const props = defineProps({
  board: {
    type: Object as PropType<IBoard>,
    required: true
  }
})

const avisaFormFechado = () => {
  emit("form-fechado");
}

const excluirBoard = async () => {
  const responseAPI = await boardService.apagarBoard(props.board?.id);

  if (responseAPI.getError())
    toast.error(responseAPI.getResponse() as string);
  else {
    toast.success(responseAPI.getResponse() as string);
    avisaFormFechado();
  }
}
</script>