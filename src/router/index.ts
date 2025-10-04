import {validaToken} from "@/utils/Utils.ts";
import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("@/views/Home.vue"),
        },
        {
            path: "/auth/register",
            name: "UserRegister",
            component: () => import("@/views/UserRegister.vue"),
        },
        {
            path: "/auth/login",
            name: "Login",
            component: () => import("@/views/Login.vue"),
        },
        {
            path: "/boards",
            name: "Boards",
            component: () => import("@/views/Kanban.vue"),
        },
    ],
});

router.beforeEach((to, from, next) => {
    const rotasPublicas = ['Login', 'UserRegister'];
    const token: string | null = localStorage.getItem("token");

    if (rotasPublicas.includes(to.name as string)) {
        next();
        return;
    }

    if (!token) {
        next({
            path: 'auth/login',
            replace: true
        });
        return;
    }

    const isValido = validaToken(token);

    if (!isValido) {
        next({
            path: 'auth/login',
            replace: true
        });
        return;
    }

    next();
});


export default router;
