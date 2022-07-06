<template>
  <span :title="user.username">{{ slug }}</span>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: "hunger"
      },
      slug: "H"
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