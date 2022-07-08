<template>
  <span :title="username">{{ slug }}</span>
</template>

<script>
import Auth from '@/apis/auth'
import Bus from "@/helpers/bus"

export default {
  
  data () {
    return {
      username: "未登录",
    }
  },
  created () {
    Bus.$on("userInfo", user => {
      this.username = user.username
    })
    Auth.getInfo().then(res => {
      if (res.isLogin) {
        this.username = res.data.username
      }
    })
  },
  computed:{
    slug(){
      return this.username[0]
    }
  }
}
</script>

<style scoped lang="scss">
span {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 32px;
  text-align: center;
  border-radius: 50%;
  background-color: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>