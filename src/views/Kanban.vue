<template>
  <main class="flex flex-col p-8 bg-backgroundAuth h-screen w-screen">
    <section class="flex justify-between items-center">
      <div class="flex flex-col gap-3">
        <h1 class="text-textBtn font-bold text-5xl">Quadros</h1>
        <p class="text-gray-400">Organize seus conteúdos preferidos de forma visual</p>
      </div>
      <div>
        <button
            class="bg-btn p-2 pr-4 pl-4 text-white font-bold rounded-lg"
            @click="handleViewFormBoard"
        >
          + Novo Conteúdo
        </button>
      </div>
    </section>

    <div
        v-if="exibirFormularioNovaBoard"
        class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <AddBoard
          @form-fechado="handleViewFormBoard"
          @new-board="handleNewBoard"
      />
    </div>

    <section class="flex justify-center items-center gap-4 mt-8">
      <Board v-if="boardsUsuario !== null" v-for="board in boardsUsuario"
             :key="board.titulo"
             :titulo="board.titulo"
             :descricao="board.descricao"
             :itens-board="board.itensBoard"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import Board from "@/components/kanban/Board.vue";
import BoardService from "@/services/BoardService.ts";
import type {IBoard} from "@/types/interfaces/types.ts";
import AddBoard from "@/components/kanban/AddBoard.vue";

const boardService = new BoardService();
const boardsUsuario = ref<IBoard>(null);
const exibirFormularioNovaBoard = ref<boolean>(false);

const handleViewFormBoard = () => {
  exibirFormularioNovaBoard.value = !exibirFormularioNovaBoard.value;
}

const getBoardsUsuario = async () => {
  const responseAPI = await boardService.getBoards();

  if (responseAPI.getError())
    toast.error(String(responseAPI.getResponse()));

  boardsUsuario.value = responseAPI.getResponse();
}

const handleNewBoard = async () => {
  await getBoardsUsuario();
  handleViewFormBoard()
}

onMounted(async () => {
  await getBoardsUsuario();
})
</script>