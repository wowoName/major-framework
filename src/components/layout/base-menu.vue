<!--  -->
 <template>
  <a-menu mode="horizontal" :default-selected-keys="['1','1.1']" class="menu-item" @click="clickItem">
    <template v-for="item in list">
      <template v-if="!item.children">
        <a-menu-item :key="item.id">
          <!-- <PieChartOutlined /> -->
          <span class="menu-title">{{ item.title }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.id"></sub-menu>
      </template>
    </template>
  </a-menu>
</template>

  <script>
import { defineComponent, reactive, ref, toRefs } from 'vue';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
} from '@ant-design/icons-vue';

import SubMenu from './sub-menu.vue'
const list = [
  {
    id: '1',
    title: '场景管理',
    children: [{
      id: '1.1',
      title: '场景管理一'
    }]
  },
  {
    id: '2',
    title: '规划管理'
  },
  {
    id: '3',
    title: '视图管理'
  },
  {
    id: '4',
    title: '模型管理'
  },
];
export default defineComponent({
  setup(props, context) {
    const { emit } = context
    const state = reactive({
      selectedKeys: ['1'],
    })
    const toggleCollapsed = () => {
      collapsed = !collapsed;
    };
    //所有菜单集合
    const allListData = list.reduce((amount, next) => {
      return [...amount, next, ...next.children ?? []]
    }, [])
    const methods = {
      clickItem({ key }) {
        const curItem = allListData.find(v => v.id == key)
        console.log('点击了', curItem)
        emit('clickNavigation', curItem)

      }
    }

    return {
      list,
      ...toRefs(state),
      toggleCollapsed,
      ...methods
    };
  },

  components: {
    SubMenu,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
  },
});
  </script>
  <style lang='scss' scoped>
.menu-item {
  width: 100%;
  // display: flex;
  // align-items: center;
  // justify-content: flex-start;
  background-color: $primary-bg-color;
  border-color: $primary-border-color;
  border-width: 1px;
  padding-bottom: 2px;
}
</style>