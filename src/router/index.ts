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

export default router;
