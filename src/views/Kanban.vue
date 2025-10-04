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
            @click="showFormBoard"
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
        @form-fechado="showFormBoard"
      />
    </div>

    <section class="flex justify-center items-center gap-4 mt-8">
      <Board
          titulo="A Assistir"
          :itens-board="[]"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Board from "@/components/kanban/Board.vue";
import AddBoard from "@/components/kanban/AddBoard.vue";

const exibirFormularioNovaBoard = ref<boolean>(false);

const showFormBoard = () => {
  exibirFormularioNovaBoard.value = !exibirFormularioNovaBoard.value;
}
</script>