import ResponseAPI from "@/utils/ResponseAPI";
import {useAuthStore} from "@/stores/auth-store";
import type {IUserRegister} from "@/types/interfaces/IUserRegister";

class UserService {
    private readonly authStore = useAuthStore()

    async registrarUsuario(input: IUserRegister): Promise<ResponseAPI<string>> {
        return await this.authStore.registerUser(input);
    }
}

export default UserService;