import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/Login"
import NotebookList from "@/components/NotebookList"
import NoteDetail from "@/components/NoteDetail"
import TrashDetail from "@/components/Trash"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: Login
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/notebooks",
    component:NotebookList
  },
  {
    path: "/note",
    component: NoteDetail
  }, {
    path: "/trash",
    component:TrashDetail
  }

]

const router = new VueRouter({
  routes
})

export default router
