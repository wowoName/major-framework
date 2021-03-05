<!-- 组件 -->
 <template>
  <CurrentComponent ref="content" />
</template>
  <script>
import ErrorComponent from '@/views/error/index.vue'
import LoadingComponent from '@/views/loading/index.vue'
import { defineAsyncComponent } from 'vue'
//所有组件路径对象
import componentPath from '@/router/component.js'
import { ref } from 'vue'
export default {
  components: {
    ErrorComponent,
    LoadingComponent
  },
  props: {
    pathName: {
      type: String,
      default: 'home'
    }
  },
  setup(props, context) {
    const content = ref(null)
    //路径
    const path = componentPath[props.pathName] ?? '../views/error/index.vue'
    console.log(path, '路径')
    //引入当前组件
    const CurrentComponent = defineAsyncComponent({
      loader: () => import(path),
      loadingComponent: LoadingComponent,
      errorComponent: ErrorComponent,
      delay: 200, // default: 200
      timeout: 2000, // default: Infinity
      suspensible: false, // default: true
      onError(error, retry, fail, attempts) {
        if (error.message.match(/fetch/) && attempts <= 3) {
          retry()
        } else {
          fail()
        }
      }
    })
    const methdos = {
      close() {
        if (content.value?.close)
          return content.value.close();
        else return new Promise((resolve) => resolve(true))
      }
    }
    return {
      CurrentComponent,
      content,
      ...methdos
    }
  },
}
  </script>
  <style lang='scss' scoped></style>