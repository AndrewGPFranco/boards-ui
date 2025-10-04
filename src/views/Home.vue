<template>
  <section class="bg-backgroundAuth h-screen w-screen text-white">
    <div v-if="!isLogado" class="flex flex-col gap-4">
      <router-link :to="{ name: 'UserRegister' }">Register</router-link>
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </div>
    <div v-else class="flex flex-col gap-4">
      <p class="font-bold">Bem vindo a Plataforma </p>
      <router-link :to="{ name: 'Boards' }">Boards</router-link>
      <button class="w-10" @click="logout">Logout</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import router from "@/router";
import {useAuthStore} from "@/stores/auth-store.ts";

const authStore = useAuthStore();
const isLogado = localStorage.getItem("token") !== null;

const logout = async () => {
  authStore.logout();
  await router.push({name: "Login"});
}
</script>