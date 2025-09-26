import {ref} from "vue";
import type {IToast} from "@/types/interfaces/IToast";

let id = 0;
const toasts = ref<Array<IToast>>([]);

export default function useToast() {
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
        addToast,
    };
}
