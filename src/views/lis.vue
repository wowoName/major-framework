<!--  -->
 <template>
  <div>
    <input type='button' value='test' @click='doChange()' />
    {{ msg }}
  </div>
</template>

  <script>
import { reactive, toRefs, computed, watch, onMounted, onBeforeUnmount } from 'vue'
export default {
  setup(props, context) {
    let state = reactive({
      msg: 'state',
      wMsg: '',
    })
    /**计算属性 */
    const changeMsg = computed(() => state.msg + new Date())
    /**事件 */
    const doChange = () => {
      state.msg = Math.random().toString(36).substr(2)
    }

    /** 监听*/
    const stop = watch(
      a => state.msg,
      (value, oldValue) => (state.wMsg = value),
      {
        immediate: true,
      }
    )
    return {
      ...toRefs(state), //抛出
    }
  },
}
  </script>
  <style lang='scss' scoped></style>