import {AxiosError} from "axios";
import {defineStore} from "pinia";
import {api} from "@/utils/AxiosInstance";
import ResponseAPI from "@/utils/ResponseAPI";
import type {IUserLogin} from "@/types/interfaces/IUserLogin";
import type {IUserRegister} from "@/types/interfaces/IUserRegister";

export const useAuthStore = defineStore("auth-store", {
    actions: {
        handleError(error: unknown) {
            if (error instanceof AxiosError) {
                if (error.code === 'ERR_NETWORK')
                    return new ResponseAPI(true,
                        "O serviço está fora do ar, por favor entrar em contato com o suporte!");

                return new ResponseAPI(true, error.response?.data?.response);
            }

            return new ResponseAPI(true, "Erro inesperado");
        },
        async registerUser(data: IUserRegister): Promise<ResponseAPI<string>> {
            try {
                await api.post("/open/v1/auth/registrar-usuario", data);
                return new ResponseAPI(
                    false,
                    "Seu cadastro foi realizado com sucesso!",
                );
            } catch (error: unknown) {
                return this.handleError(error);
            }
        },

        async login(input: IUserLogin): Promise<ResponseAPI<string>> {
            try {
                const result = await api.post("/open/v1/auth/login", input);
                localStorage.setItem("token", result.data.response);
                return new ResponseAPI(false, "Login realizado com sucesso!");
            } catch (error: unknown) {
                return this.handleError(error);
            }
        },
    },
});
