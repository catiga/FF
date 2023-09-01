import { createRouter, createWebHistory } from "vue-router";
import type { App } from 'vue';

// 路由信息
let routes = [
  {
    path: "/",
    component: () => import("~/views/layouts/Layout.vue"),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import("~/views/home/Home.vue"),
      },
      {
        path: '/chat/:chatid/:sampleid?',
        name: 'chat',
        component: () => import("~/views/chat/Chatroom.vue"),
      },
    ]
  },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

/** setup vue router. - [安装vue路由] */
export async function setupRouter(app: App) {
  app.use(router);
  await router.isReady();
}

// export default router;

// 现在，应用已经启动了！
