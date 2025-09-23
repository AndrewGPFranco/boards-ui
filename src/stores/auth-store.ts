import {defineStore} from "pinia";
import {api} from "@/utils/AxiosInstance";
import ResponseAPI from "@/utils/ResponseAPI";
import type {IUserRegister} from "@/types/interfaces/IUserRegister";

export const useAuthStore = defineStore("auth-store", {
    actions: {
        async registerUser(data: IUserRegister): Promise<ResponseAPI<string>> {
            try {
                await api.post("/open/v1/auth/registrar-usuario", data);
                return new ResponseAPI(
                    false,
                    "Seu cadastro foi realizado com sucesso!",
                );
            } catch (error: any) {
                console.error(error.response?.data);
                return new ResponseAPI(
                    true,
                    error.response?.data,
                );
            }
        },
    },
});
