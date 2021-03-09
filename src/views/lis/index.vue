<!--  -->
 <template>
  <div class="lis-main">
    <div v-for="item in names" :key="item">
      {{item}}
    </div>
    <input type="button" value="test" @click="changeParams()">
    <div>
      {{$attrs}}
    </div>
    父：
    <ChildVue :params="names" />
  </div>
</template>

  <script>
import { reactive, toRefs, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import ChildVue from './a.vue'
export default {
  components: {
    ChildVue
  },
  setup(props, context) {
    console.log("父", context.attr)
    const state = reactive({
      names: [1, 2, 3, 4, 5]
    })

    function changeParams() {
      state.names = state.names.map(v => v * Math.random())
    }
    return {
      changeParams,
      ...toRefs(state), //抛出
    }
  },
}
  </script>
  <style lang='scss' scoped>
.lis-main {
  height: 100%;
  overflow: auto;
}
</style>