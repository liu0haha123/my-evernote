import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    alias: "/notebooks",
    component: () => import("@/components/NotebookList.vue")
  },
  {
    path: "/login",
    component: () => import("@/components/Login.vue")
  },
  {
    path: "/note",
    component: () => import("@/components/NoteDetail.vue")
  },
  {
    path: "/trash",
    component: () => import("@/components/Trash.vue")
  }

]

const router = new VueRouter({
  routes
})

export default router
