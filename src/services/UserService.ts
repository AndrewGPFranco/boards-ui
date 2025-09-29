import ResponseAPI from "@/utils/ResponseAPI";
import { useAuthStore } from "@/stores/auth-store";
import type { IUserRegister } from "@/types/interfaces/IUserRegister";
import type { IUserLogin } from "@/types/interfaces/IUserLogin";

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