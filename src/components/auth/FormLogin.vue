<template>
  <main
      class="flex justify-center items-center bg-black p-10 border border-slate-800 rounded-lg min-h-[60%]"
  >
    <form @submit.prevent="login" class="flex flex-col gap-4 w-full">
      <header
          class="flex flex-col gap-2 items-center justify-center mb-5"
      >
        <h1 class="text-textBtn font-bold text-lg">Realizar Login</h1>
        <p>Preencha os dados para se logar</p>
      </header>

      <div class="flex gap-4 justify-center items-start">
        <fieldset class="flex flex-col gap-4 border-none">
          <legend class="sr-only">Informações Pessoais</legend>

          <div class="flex flex-col gap-1">
            <label for="email" class="font-bold">Email</label>
            <input
                id="email"
                type="email"
                v-model="user.email"
                placeholder="Email"
                required
                class="placeholder-gray-400 text-white rounded-md p-2 bg-transparent border border-slate-800 w-full min-w-96 focus:border-textBtn focus:outline-none"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="nomeCompleto" class="font-bold"
            >Senha</label
            >
            <input
                id="password"
                type="password"
                v-model="user.password"
                placeholder="Senha"
                required
                class="placeholder-gray-400 text-white rounded-md p-2 bg-transparent border border-slate-800 w-full min-w-96 focus:border-textBtn focus:outline-none"
            />
          </div>
        </fieldset>
      </div>

      <button
          type="submit"
          class="bg-btn p-2 rounded-lg font-bold hover:bg-purple-700 focus:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
      >
        Efetuar Login
      </button>
      <footer class="flex gap-2 justify-center mt-2">
        <p class="text-white">Ainda não possui uma conta?</p>
        <router-link
            :to="{ name: 'UserRegister' }"
            class="text-textBtn hover:underline font-bold"
        >
          Faça o cadastro
        </router-link>
      </footer>
    </form>
  </main>
</template>

<script setup lang="ts">
import z from "zod";
import {ref} from "vue";
import router from "@/router";
import useToast from "@/composables/useToast";
import UserService from "@/services/UserService";
import type {IUserLogin} from "@/types/interfaces/types.ts";

const schema = z.object({
  email: z.email().min(5, "Email inválido").max(100, "Email muito longo"),
  password: z
      .string()
      .min(8, "Senha muito curta")
      .max(100, "Senha muito longa"),
});

const toast = useToast();
const authService = new UserService();

const user = ref<IUserLogin>({
  email: "",
  password: "",
});

const login = async () => {
  const resultValidation = schema.safeParse(user.value);

  if (!resultValidation.success) {
    toast.error("Erro ao validar os dados");
    return;
  }

  const responseAPI = await authService.login(user.value);

  if (responseAPI.getError()) toast.error(String(responseAPI.getResponse()));
  else {
    toast.success(String(responseAPI.getResponse()));
    await router.push({name: "Home"});
  }
};
</script>
