<!--  -->
 <template>
  <a-menu mode="horizontal" :default-selected-keys="['1','1.1']" class="menu-item">
    <template v-for="item in list">
      <template v-if="!item.children">
        <a-menu-item :key="item.key">
          <!-- <PieChartOutlined /> -->
          <span class="menu-title">{{ item.title }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.key"></sub-menu>
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
    key: '1',
    title: '场景管理',
    children: [{
      key: '1.1',
      title: '场景管理一'
    }]
  },
  {
    key: '2',
    title: '规划管理'
  },
  {
    key: '3',
    title: '视图管理'
  },
  {
    key: '4',
    title: '模型管理'
  },
];
export default defineComponent({
  setup() {
    const state = reactive({
      selectedKeys: ['1'],
    })
    const toggleCollapsed = () => {
      collapsed = !collapsed;
    };

    return {
      list,
      ...toRefs(state),
      toggleCollapsed,
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