import type ResponseAPI from "@/utils/ResponseAPI.ts";
import {useBoardStore} from "@/stores/board-store.ts";
import type {IBoard} from "@/types/interfaces/types.ts";

class BoardService {
    private readonly boardStore = useBoardStore();

    async getBoards(): Promise<ResponseAPI<IBoard>> {
        return await this.boardStore.getBoards();
    }

}

export default BoardService;