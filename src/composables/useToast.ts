import { ref } from "vue";
import type { IToast } from "@/types/interfaces/IToast";

let id = 0;
const toasts = ref<Array<IToast>>([]);

export default function useToast() {
  function success(message: string): void {
    addToast(message, "success");
  }

  function error(message: string): void {
    addToast(message, "error");
  }

  function info(message: string): void {
    addToast(message, "info");
  }

  function warning(message: string): void {
    addToast(message, "warning");
  }

  function addToast(message: string, type: string): void {
    const idNew = id++;

    const toast: IToast = {
      id: idNew,
      message,
      type: type,
    };

    toasts.value.push(toast);

    setTimeout(() => {
      removeToast(toast);
    }, 3000);
  }

  function removeToast(toast: IToast): void {
    toasts.value = toasts.value.filter((t: IToast) => t.id !== toast.id);
  }

  return {
    toasts,
    success,
    error,
    info,
    warning,
  };
}
