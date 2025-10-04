import {defineStore} from "pinia";
import {api} from "@/utils/AxiosInstance.ts";
import ResponseAPI from "@/utils/ResponseAPI.ts";
import type {IAddBoard, IAddItem, IBoard} from "@/types/interfaces/types.ts";

export const useBoardStore = defineStore("board-store", {
    actions: {
        async getBoards(): Promise<ResponseAPI<IBoard | string>> {
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
        async addBoard(board: IAddBoard): Promise<ResponseAPI<string>> {
            try {
                const token: string | null = localStorage.getItem("token");

                const response = await api.post("/api/v1/board", board, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                return new ResponseAPI(false, response.data);
            } catch (error) {
                console.log(error)
                return new ResponseAPI(true, "Erro ao criar uma nova board, tente novamente!");
            }
        },
        async addItem(item: IAddItem): Promise<ResponseAPI<string>> {
            try {
                const token: string | null = localStorage.getItem("token");

                const response = await api.post("/api/v1/item-board", item, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                return new ResponseAPI(false, response.data);
            } catch (error) {
                console.log(error)
                return new ResponseAPI(true, "Erro ao criar uma nova board, tente novamente!");
            }
        },
        async getCategorias(): Promise<ResponseAPI<Array<string>>> {
            try {
                const token: string | null = localStorage.getItem("token");

                const response = await api.get("/api/v1/board/categorias", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                return new ResponseAPI(false, response.data);
            } catch (error) {
                console.log(error)
                return new ResponseAPI(true, []);
            }
        }
    },
});
