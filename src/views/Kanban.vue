<template>
  <main class="flex flex-col p-8 bg-backgroundAuth min-h-screen h-auto w-screen">
    <section class="flex justify-between items-center">
      <div class="flex flex-col gap-3">
        <h1 class="text-textBtn font-bold text-5xl">Quadros</h1>
        <p class="text-gray-400">Organize seus conteúdos preferidos de forma visual</p>
      </div>
      <div class="flex gap-3">
        <button
            class="bg-btn p-2 pr-4 pl-4 text-white font-bold rounded-lg hover:bg-purple-700"
            @click="handleViewFormBoard"
        >
          + Nova Board
        </button>
        <button
            class="bg-btn p-2 pr-4 pl-4 text-white font-bold rounded-lg hover:bg-purple-700"
            @click="handleViewFormItem"
        >
          + Novo Item
        </button>
      </div>
    </section>

    <div
        v-if="exibirFormularioNovaBoard"
        class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <AddBoard
          @form-fechado="handleViewFormBoard"
          @new-board="handleNew('board')"
      />
    </div>

    <div
        v-if="exibirFormularioNovoItem"
        class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <AddItem
          :id-boards="idsBoards"
          @form-fechado="handleViewFormItem"
          @new-item="handleNew('item')"
      />
    </div>

    <section class="overflow-x-auto mt-20 pb-4">
      <div class="inline-flex items-center gap-4 mx-auto">
        <Board v-if="boardsUsuario !== null"
               v-for="board in boardsUsuario"
               :key="`${board.id}-${board.itensBoard?.length || 0}`"
               :titulo="board.titulo"
               :descricao="board.descricao"
               :itens-board="board.itensBoard"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import useToast from "@/composables/useToast.ts";
import Board from "@/components/kanban/Board.vue";
import BoardService from "@/services/BoardService.ts";
import AddItem from "@/components/kanban/AddItem.vue";
import type {IBoard} from "@/types/interfaces/types.ts";
import AddBoard from "@/components/kanban/AddBoard.vue";

const toast = useToast();
const boardService = new BoardService();
const exibirFormularioNovoItem = ref<boolean>(false);
const exibirFormularioNovaBoard = ref<boolean>(false);
const boardsUsuario = ref<Array<IBoard>>([] as Array<IBoard>);
const idsBoards = computed(() => new Map(boardsUsuario.value.map((board) => [board.id, board.titulo])));

const handleViewFormBoard = () => {
  exibirFormularioNovaBoard.value = !exibirFormularioNovaBoard.value;
}

const handleViewFormItem = () => {
  exibirFormularioNovoItem.value = !exibirFormularioNovoItem.value;
}

const getBoardsUsuario = async () => {
  const responseAPI = await boardService.getBoards();

  if (responseAPI.getError()) {
    toast.error(String(responseAPI.getResponse()));
    return;
  }

  const data = responseAPI.getResponse();

  if (Array.isArray(data))
    boardsUsuario.value = [...data];
  else
    boardsUsuario.value = [];
};

const handleNew = async (form: string) => {
  await getBoardsUsuario();

  if (form === "board")
    handleViewFormBoard()
  else
    handleViewFormItem()
}

onMounted(async () => {
  await getBoardsUsuario();
})
</script>