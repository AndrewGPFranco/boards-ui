import type ResponseAPI from "@/utils/ResponseAPI.ts";
import {useBoardStore} from "@/stores/board-store.ts";
import type {IAddBoard, IAddItem, IBoard} from "@/types/interfaces/types.ts";

class BoardService {
    private readonly boardStore = useBoardStore();

    async getBoards(): Promise<ResponseAPI<IBoard | string>> {
        return await this.boardStore.getBoards();
    }

    async addBoard(board: IAddBoard): Promise<ResponseAPI<string>> {
        return await this.boardStore.addBoard(board);
    }

    async addItem(item: IAddItem): Promise<ResponseAPI<string>> {
        return await this.boardStore.addItem(item);
    }

    async getCategorias(): Promise<ResponseAPI<Array<string>>> {
        return await this.boardStore.getCategorias();
    }
}

export default BoardService;