<template>
  <section class="bg-backgroundAuth h-screen w-screen text-white">
    <div v-if="!isLogado" class="flex flex-col gap-4">
      <router-link :to="{ name: 'UserRegister' }">Register</router-link>
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </div>
    <div v-else>
      <p class="font-bold">Bem vindo a Plataforma </p>
      <router-link :to="{ name: 'Boards' }">Boards</router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
const isLogado = localStorage.getItem("token") !== null;
</script>