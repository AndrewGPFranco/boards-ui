<template>
    <section
        class="flex justify-center items-center bg-black p-10 border border-slate-800 rounded"
    >
        <form @submit.prevent="register" class="flex flex-col gap-4">
            <div class="flex flex-col gap-2 items-center justify-center">
                <h1 class="text-textBtn font-bold text-lg">Criar conta</h1>
                <span>Preencha os dados para se registrar</span>
            </div>
            <div class="flex flex-col gap-2">
                <label for="nome">Nome</label>
                <input
                    type="text"
                    v-model="user.nome"
                    placeholder="Nome"
                    required
                    class="placeholder-gray-400 text-white rounded-sm p-2 bg-transparent border border-slate-800"
                />
            </div>
            <div class="flex flex-col gap-2">
                <label for="nomeCompleto">Nome Completo</label>
                <input
                    type="text"
                    v-model="user.nomeCompleto"
                    placeholder="Nome Completo"
                    required
                    class="placeholder-gray-400 text-white rounded-sm p-2 bg-transparent border border-slate-800"
                />
            </div>
            <div class="flex flex-col gap-2">
                <label for="username">@Usuario</label>
                <input
                    type="text"
                    v-model="user.username"
                    placeholder="@Usuario"
                    required
                    class="placeholder-gray-400 text-white rounded-sm p-2 bg-transparent border border-slate-800"
                />
            </div>
            <div class="flex flex-col gap-2">
                <label for="numeroTelefone">Número de Telefone</label>
                <input
                    type="text"
                    v-model="user.numeroTelefone"
                    placeholder="Número de Telefone"
                    required
                    class="placeholder-gray-400 text-white rounded-sm p-2 bg-transparent border border-slate-800"
                />
            </div>
            <div class="flex flex-col gap-2">
                <label for="dataNascimento">Data de Nascimento</label>
                <input
                    type="date"
                    v-model="user.dataNascimento"
                    placeholder="Data de Nascimento"
                    required
                    class="placeholder-gray-400 text-white rounded-sm p-2 bg-transparent border border-slate-800"
                />
            </div>
            <div class="flex flex-col gap-2">
                <label for="email">Email</label>
                <input
                    type="email"
                    v-model="user.email"
                    placeholder="Email"
                    required
                    class="placeholder-gray-400 text-white rounded-sm p-2 bg-transparent border border-slate-800"
                />
            </div>
            <div class="flex flex-col gap-2">
                <label for="senha">Senha</label>
                <input
                    type="password"
                    v-model="user.senha"
                    placeholder="Password"
                    required
                    class="placeholder-gray-400 text-white rounded-sm p-2 bg-transparent border border-slate-800"
                />
            </div>
            <button type="submit" class="bg-btn p-2 rounded-lg">
                Register
            </button>
        </form>
    </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { IUserRegister } from "@/types/interfaces/IUserRegister";

const user = ref<IUserRegister>({
    nome: "",
    username: "",
    email: "",
    senha: "",
    nomeCompleto: "",
    numeroTelefone: "",
    dataNascimento: new Date(),
});

const register = () => {
    alert(user.value);
    console.log(user.value);
};
</script>
