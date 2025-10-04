import ResponseAPI from "@/utils/ResponseAPI";
import {useAuthStore} from "@/stores/auth-store";
import type {IUserLogin, IUserRegister} from "@/types/interfaces/types.ts";

class UserService {
    private readonly authStore = useAuthStore();

    async registrarUsuario(input: IUserRegister): Promise<ResponseAPI<string>> {
        return await this.authStore.registerUser(input);
    }

    async login(input: IUserLogin): Promise<ResponseAPI<string>> {
        return await this.authStore.login(input);
    }
}

export default UserService;