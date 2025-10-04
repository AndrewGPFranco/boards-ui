<template>
  <div
      class="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center space-y-3"
  >
    <TransitionGroup name="toast" tag="div">
      <ToastItem
          v-for="toast in toasts"
          :key="toast.id"
          :id="toast.id"
          :message="toast.message"
          :type="toast.type"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import useToast from "@/composables/useToast.ts";
import ToastItem from "./ToastItem.vue";

const {toasts} = useToast();
</script>

<style scoped lang="css">
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
