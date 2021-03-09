<!--  -->
 <template>
  <div>
    a.vue
    <ul>
      <li v-for="(value,key) in config" :key="key">
        {{key}}:{{value}}
      </li>
    </ul>
    <br><br>
    子级：
    <ChildVue v-bind="$attrs" />
  </div>
</template>

  <script>
import ChildVue from './b.vue'
import { reactive, toRefs, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
export default {
  components: { ChildVue },
  props: {},
  setup(props, context) {
    console.log('子', context.attr)
    const store = useStore()
    const data = reactive({
      config: {
        age: 10
      }
    })
    console.log('这是a.vue store:', store.getters['user/userName'])
    return {
      ...toRefs(data)
    }
  },
}
  </script>
  <style lang='scss' scoped></style>