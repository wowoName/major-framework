<!-- 组件 -->
 <template>
  <CurrentComponent ref="content" v-bind="$attrs" />
</template>
  <script>
import ErrorComponent from '@/views/error/index.vue'
import LoadingComponent from '@/views/loading/index.vue'
import { defineAsyncComponent, reactive } from 'vue'
//所有组件路径对象
import componentPath from '@/router/component.js'
import { ref, toRefs, computed, watch, watchEffect } from 'vue'
export default {
  components: {
    ErrorComponent,
    LoadingComponent
  },
  props: {
    pathName: {
      type: String,
      default: 'home'
    },
  },
  setup(props, context) {
    const content = ref(null)
    console.log(context.attrs?.params)
    const state = reactive({
      currentParams: JSON.parse(context.attrs?.params ?? '{}')
    })
    //路径
    const path = componentPath[props.pathName] ?? '../views/error/index.vue'
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
    watch(() => props,
      () => {
        console.log('坎坎坷坷')
      })
    return {
      CurrentComponent,
      content,
      ...toRefs(state),
      ...methdos
    }
  },
}
  </script>
  <style lang='scss' scoped></style>