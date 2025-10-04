import {jwtDecode} from "jwt-decode";
import type {IDecodeJWT} from "@/types/interfaces/types.ts";

export function validaToken(token: string): boolean {
    const decoded: IDecodeJWT = jwtDecode(token);
    const dataExpericaoToken = new Date(decoded.exp * 1000);

    if (dataExpericaoToken < new Date()) {
        localStorage.removeItem("token");
        return false;
    }

    return true;
}