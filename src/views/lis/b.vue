<template>
  <div>
    的三大地方第三方发盛世嫡妃是
    sdafdsaf
    <div>
      <p>用户信息</p>
      {{ this.$store.state.user.userName}}
    </div>
    <input type="button" value="store" @click="changeUseInfos()">
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '降维'
    }
  },
  methods: {
    sayHello() {
      console.log('这是b说：b.vue', this.$store.state.user.userName)
    },
    changeUseInfos() {
      this.$store.dispatch('user/SET_USENAME', +new Date())
    }
  },
  created() {
    this.sayHello()
  }
}
</script>

<style>
</style>