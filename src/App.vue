<script setup lang="ts">
import ToastProvider from "./components/utils/ToastProvider.vue";
</script>

<template>
    <router-view />
    <ToastProvider />
</template>