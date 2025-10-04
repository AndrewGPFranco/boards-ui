<template>
  <section class="flex flex-col gap-4 border border-gray-200 rounded-xl p-6 w-96 bg-gray-100 shadow-md">
    <button
        @click="avisaFormFechado"
        class="ml-auto bg-textBtn text-white px-4 py-2 rounded hover:bg-purple-700"
    >
      Fechar
    </button>

    <form @submit.prevent="addItem" class="flex flex-col gap-6 w-full">
      <fieldset class="flex flex-col gap-4 border-none">
        <legend class="sr-only">Informações do Item</legend>

        <div class="flex flex-col gap-1">
          <label for="titulo" class="text-sm font-medium text-gray-700">Título</label>
          <input
              id="titulo"
              type="text"
              v-model="item.titulo"
              placeholder="Digite o título da board"
              required
              class="rounded-lg px-3 py-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-300 focus:outline-none"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="descricao" class="text-sm font-medium text-gray-700">Descrição</label>
          <textarea
              id="descricao"
              v-model="item.descricao"
              placeholder="Digite uma breve descrição"
              required
              rows="3"
              class="rounded-lg px-3 py-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-300 focus:outline-none resize-none"
          ></textarea>
        </div>
        <div class="flex flex-col gap-1">
          <label for="categories" class="text-sm font-medium text-gray-700">Categoria</label>
          <select
              name="categories"
              id="categories"
              v-model="item.categoryType"
              class="rounded-lg px-3 py-2 text-gray-900 bg-white border border-gray-300
           focus:border-purple-600 focus:ring-2 focus:ring-purple-300
           focus:outline-none cursor-pointer"
          >
            <option v-for="categoria in categorias" :key="categoria" :value="categoria">
              {{ categoria }}
            </option>
          </select>
        </div>

        <div class="flex flex-col gap-1">
          <label for="idBoards" class="text-sm font-medium text-gray-700">Board</label>
          <select
              name="idBoards"
              id="idBoards"
              v-model="item.idBoard"
              class="rounded-lg px-3 py-2 text-gray-900 bg-white border border-gray-300
           focus:border-purple-600 focus:ring-2 focus:ring-purple-300
           focus:outline-none cursor-pointer"
          >
            <option v-for="[id, titulo] in props.idBoards" :key="id" :value="id">
              {{ titulo }}
            </option>
          </select>
        </div>
      </fieldset>

      <button
          type="submit"
          class="bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
      >
        Adicionar item
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
import z from "zod";
import {onMounted, ref} from "vue";
import useToast from "@/composables/useToast.ts";
import type {IAddItem} from "@/types/interfaces/types.ts";
import BoardService from "@/services/BoardService.ts";

const toast = useToast();
const item = ref<IAddItem>({
  titulo: "",
  descricao: "",
  categoryType: "",
  idBoard: ""
});

const props = defineProps({
  idBoards: {
    type: Map<string, string>,
    required: true,
  }
})

const categorias = ref<Array<String> | null>([] as string[]);

const boardService = new BoardService();
const emit = defineEmits(["form-fechado", "new-item"]);

const schema = z.object({
  titulo: z
      .string()
      .min(3, "Título muito curto!")
      .max(25, "Título muito longo!"),
  descricao: z
      .string()
      .min(1, "Descrição muito curta")
      .max(5000, "Descrição muito longa"),
  categoryType: z
      .enum(["JOGO", "ANIME", "MANGA", "SERIE", "NOVELA"]),
  idBoard: z
      .string()
});

const addItem = async () => {
  const resultValidation = schema.safeParse(item.value);

  if (!resultValidation.success) {
    toast.error("Erro ao validar os dados");
    return;
  }

  const responseAPI = await boardService.addItem(item.value);

  if (responseAPI.getError())
    toast.error(String(responseAPI.getResponse()));
  else {
    toast.success(String(responseAPI.getResponse()));
    resetItem();
    emit("new-item");
  }
}

const avisaFormFechado = () => {
  emit("form-fechado");
}

const resetItem = () => {
  item.value.titulo = "";
  item.value.descricao = "";
  item.value.categoryType = "";
  item.value.idBoard = "";
}

const getCategorias = async () => {
  const response = await boardService.getCategorias();
  categorias.value = response?.getResponse();
}

onMounted(async () => {
  await getCategorias();
})
</script>