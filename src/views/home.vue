<!--  -->
 <template>
  <div class="home-main">
    <a-input v-model:value="name" />
    <br /><br />
    attrs： {{$attrs}}
    <input type="button" value='跳转 home' style="color:#000" @click="routerGo()">
    <br /><br />
    params: {{params}}
    ----------------------
  </div>
</template>

<script >
import { ref, toRefs, computed, onUpdated, reactive, getCurrentInstance } from 'vue'
export default {
  props: {

  },
  setup(props, context) {
    console.log(context, '急急急', props)
    //路由跳转 引入
    const { proxy } = getCurrentInstance()

    //接受参数  string 类型！！！
    const state = reactive({
      params: context.attrs
    })
    const name = ref('姓名')
    const methods = {
      //跳转到home
      routerGo() {
        //跳转到一个id为 scenario 的 modal
        proxy.go({
          title: 'Home',
          id: 'scenario',
          type: 'tab',
          params: {
            name: +new Date(),
            desc: '这是我的参数'
          }
        })
      },
      //modal 关闭回调事件 （非必须）
      close() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log('关闭')
            resolve(true)
          }, 200)
        })
      }
    }

    return {
      ...methods,
      ...toRefs(state),
      name
    }
  }
}

  </script>
  <style lang='scss' scoped>
.home-main {
  color: $primary-font-color;
}
</style>