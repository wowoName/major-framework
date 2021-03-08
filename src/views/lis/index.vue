<!--  -->
 <template>
  <div v-for="item in names" :key="item">
    {{item}}
  </div>
  <div>
    {{$attrs}}
  </div>
</template>

  <script>
import { reactive, toRefs, computed, watch, onMounted, onBeforeUnmount } from 'vue'
export default {
  setup(props, context) {

    const state = reactive({
      names: [1, 2, 3, 4, 5]
    })
    return {
      ...toRefs(state), //抛出
    }
  },
}
  </script>
  <style lang='scss' scoped></style>