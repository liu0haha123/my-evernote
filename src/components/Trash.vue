<template>
  <div id="trash-detail">
    <h1>notebookId : {{ $route.query.notebookId }}</h1>
    <h1>noteId : {{ $route.query.noteId }}</h1>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
export default {
  name: 'TrashDetail',
  data () {
    return {
      msg: '回收站'
    }
  },
  created () {
    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" })
      }
    })
  }
}
</script>

<style scoped lang="scss">
h1 {
  color: blue;
}
</style>