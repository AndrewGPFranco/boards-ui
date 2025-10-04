import type ResponseAPI from "@/utils/ResponseAPI.ts";
import {useBoardStore} from "@/stores/board-store.ts";
import type {IAddItem, IBoard} from "@/types/interfaces/types.ts";

class BoardService {
    private readonly boardStore = useBoardStore();

    async getBoards(): Promise<ResponseAPI<IBoard>> {
        return await this.boardStore.getBoards();
    }

    async addBoard(board: IAddItem): Promise<ResponseAPI<string>> {
        return await this.boardStore.addBoard(board);
    }

}

export default BoardService;