<template>
  <div id="login">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
    name: "Login",
    data () {
        return {
            msg:"登录组件"
        }
    }
}
</script>

<style lang="scss" scoped>
h1{
  color: red;
}
</style>