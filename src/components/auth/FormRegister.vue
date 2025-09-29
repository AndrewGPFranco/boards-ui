<template>
    <main
        class="flex justify-center items-center bg-black p-10 border border-slate-800 rounded-lg min-h-[60%]"
    >
        <form @submit.prevent="register" class="flex flex-col gap-4 w-full">
            <header
                class="flex flex-col gap-2 items-center justify-center mb-5"
            >
                <h1 class="text-textBtn font-bold text-lg">Criar conta</h1>
                <p>Preencha os dados para se registrar</p>
            </header>

            <div class="flex gap-4 justify-center items-start">
                <fieldset class="flex flex-col gap-4 border-none">
                    <legend class="sr-only">Informações Pessoais</legend>

                    <div class="flex flex-col gap-1">
                        <label for="nome" class="font-bold">Nome</label>
                        <input
                            id="nome"
                            type="text"
                            v-model="user.nome"
                            placeholder="Nome"
                            required
                            class="placeholder-gray-400 text-white rounded-md p-2 bg-transparent border border-slate-800 w-full min-w-96 focus:border-textBtn focus:outline-none"
                        />
                    </div>

                    <div class="flex flex-col gap-1">
                        <label for="nomeCompleto" class="font-bold"
                            >Nome Completo</label
                        >
                        <input
                            id="nomeCompleto"
                            type="text"
                            v-model="user.nomeCompleto"
                            placeholder="Nome Completo"
                            required
                            class="placeholder-gray-400 text-white rounded-md p-2 bg-transparent border border-slate-800 w-full min-w-96 focus:border-textBtn focus:outline-none"
                        />
                    </div>

                    <div class="flex flex-col gap-1">
                        <label for="username" class="font-bold"
                            >Nome de usuário</label
                        >
                        <input
                            id="username"
                            type="text"
                            v-model="user.username"
                            placeholder="@Usuário"
                            required
                            autocomplete="username"
                            class="placeholder-gray-400 text-white rounded-md p-2 bg-transparent border border-slate-800 w-full min-w-96 focus:border-textBtn focus:outline-none"
                        />
                    </div>

                    <div class="flex flex-col gap-1">
                        <label for="numeroTelefone" class="font-bold"
                            >Número de Telefone</label
                        >
                        <input
                            id="numeroTelefone"
                            type="tel"
                            v-model="user.numeroTelefone"
                            placeholder="(11) 99999-9999"
                            required
                            autocomplete="tel"
                            class="placeholder-gray-400 text-white rounded-md p-2 bg-transparent border border-slate-800 w-full min-w-96 focus:border-textBtn focus:outline-none"
                        />
                    </div>
                </fieldset>

                <fieldset class="flex flex-col gap-4 border-none">
                    <legend class="sr-only">Informações de Conta</legend>

                    <div class="flex flex-col gap-1">
                        <label for="dataNascimento" class="font-bold"
                            >Data de Nascimento</label
                        >
                        <input
                            id="dataNascimento"
                            type="date"
                            v-model="user.dataNascimento"
                            required
                            autocomplete="off"
                            class="placeholder-gray-400 text-white rounded-md p-2 bg-transparent border border-slate-800 w-full min-w-96 focus:border-textBtn focus:outline-none"
                        />
                    </div>

                    <div class="flex flex-col gap-1">
                        <label for="email" class="font-bold">Email</label>
                        <input
                            id="email"
                            type="email"
                            v-model="user.email"
                            placeholder="seu@email.com"
                            required
                            autocomplete="email"
                            class="placeholder-gray-400 text-white rounded-md p-2 bg-transparent border border-slate-800 w-full min-w-96 focus:border-textBtn focus:outline-none"
                        />
                    </div>

                    <div class="flex flex-col gap-1">
                        <label for="senha" class="font-bold">Senha</label>
                        <input
                            id="senha"
                            type="password"
                            v-model="user.senha"
                            placeholder="Sua senha"
                            required
                            autocomplete="new-password"
                            class="placeholder-gray-400 text-white rounded-md p-2 bg-transparent border border-slate-800 w-full min-w-96 focus:border-textBtn focus:outline-none"
                        />
                    </div>

                    <div class="flex flex-col gap-1">
                        <label for="confirmPassword" class="font-bold"
                            >Confirmar Senha</label
                        >
                        <input
                            id="confirmPassword"
                            type="password"
                            v-model="confirmPassword"
                            placeholder="Confirme sua senha"
                            required
                            autocomplete="new-password"
                            class="placeholder-gray-400 text-white rounded-md p-2 bg-transparent border border-slate-800 w-full min-w-96 focus:border-textBtn focus:outline-none"
                        />
                    </div>
                </fieldset>
            </div>

            <button
                type="submit"
                class="bg-btn p-2 rounded-lg font-bold hover:bg-purple-700 focus:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
                Criar Conta
            </button>
            <footer class="flex gap-2 justify-center mt-2">
                <p class="text-white">Já possui uma conta?</p>
                <router-link
                    :to="{ name: 'Login' }"
                    class="text-textBtn hover:underline font-bold"
                >
                    Faça login
                </router-link>
            </footer>
        </form>
    </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";
import useToast from "@/composables/useToast";
import UserService from "@/services/UserService";
import type { IUserRegister } from "@/types/interfaces/IUserRegister";

const toast = useToast();
const authService = new UserService();

const user = ref<IUserRegister>({
    nome: "",
    username: "",
    email: "",
    senha: "",
    nomeCompleto: "",
    numeroTelefone: "",
    dataNascimento: new Date(),
});

const confirmPassword = ref<string>("");

const register = async () => {
    if (confirmPassword.value !== user.value.senha) {
        alert("As senhas não coincidem");
        return;
    }

    const responseAPI = await authService.registrarUsuario(user.value);

    if (responseAPI.getError()) toast.error(String(responseAPI.getResponse()));
    else {
        toast.success(String(responseAPI.getResponse()));
        await router.push({ name: "Home" });
    }
};
</script>
