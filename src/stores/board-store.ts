import {defineStore} from "pinia";
import {api} from "@/utils/AxiosInstance.ts";
import ResponseAPI from "@/utils/ResponseAPI.ts";
import type {IAddItem, IBoard} from "@/types/interfaces/types.ts";

export const useBoardStore = defineStore("board-store", {
    actions: {
        async getBoards(): Promise<ResponseAPI<IBoard>> {
            try {
                const token: string | null = localStorage.getItem("token");

                const response = await api.get("/api/v1/board/itens", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                return new ResponseAPI(false, response.data);
            } catch (error) {
                console.log(error)
                return new ResponseAPI(true, "Erro ao buscar as boards do usuário!");
            }
        },
        async addBoard(board: IAddItem): Promise<ResponseAPI<string>> {
            try {
                const token: string | null = localStorage.getItem("token");

                const response = await api.post("/api/v1/board", board, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                console.log(response.data);
                return new ResponseAPI(false, response.data);
            } catch (error) {
                console.log(error)
                return new ResponseAPI(true, "Erro ao criar uma nova board, tente novamente!");
            }
        }
    },
});
