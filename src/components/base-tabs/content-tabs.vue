<!--  -->
 <template>
  <div class="cont-tabs">
    <a-tabs tab-position="top" @edit="removeTabs" @change="changeTabs" :hideAdd="true" @tabClick="tabClick"
      type="editable-card" v-model:activeKey="activeKey">
      <a-tab-pane v-for="item in currentTabs" :key="item.id" :closable="item.closable">
        <template #tab>
          <span class="tab-title">{{item.title}}</span>
        </template>
        <div class="tabs-content">
          <BaseComponent :pathName="item.pathName" :params="item.params" />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

  <script>
import { reactive, toRefs } from 'vue'
import BaseComponent from '@com/baseContainer.vue'
export default {
  props: {
    tabsData: {
      type: Array,
      default: () => []
    }
  },
  components: {
    BaseComponent
  },
  setup(props, context) {
    const state = reactive({
      activeKey: props.tabsData?.[0]?.id ?? '',
      currentTabs: props.tabsData
    })
    const methods = {
      /**
       * 设置 activeKey
       * @param {String}  key
       */
      setActiveKey(key) {
        state.activeKey = key
      },
      /**
       * tab点击方法
       */
      tabClick() { },
      //移除tab
      removeTabs(targetKey) {
        const tabsData = state.currentTabs
        const currentIndex = tabsData.findIndex(v => v.id === targetKey)
        //删除
        context.emit('removeTabs', currentIndex)
        //activeKey 改为上一条数据
        state.activeKey = tabsData[currentIndex - 1]['id']
      },
      //改变 tabs
      changeTabs(targetKey) {
        // console.log('改变的key', targetKey)
      }
    }
    return {
      ...toRefs(state),
      ...methods
    }
  },
}
  </script>
  <style lang='scss' scoped>
.cont-tabs {
  height: 100%;
  ::v-deep {
    .ant-tabs {
      height: 100%;
    }
    .ant-tabs-content {
      height: 90%;
      position: relative;
    }
    .ant-tabs-bar {
      border-bottom: 1px solid $primary-border-color;
    }
    .ant-tabs-ink-bar {
      background-color: rgb(32, 97, 124);
    }
    svg {
      color: $primary-font-color;
    }
    .ant-tabs-tab {
      &:hover {
        background: rgba(0, 83, 110, 0.6) !important;
      }
    }
    .ant-tabs-tab-active {
      background: #00536e !important;
    }
    .tab-title {
      color: $primary-font-color;
    }
    .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
      margin: 0;
      background: #002945;
      border: none;
      border-bottom: 1px solid $primary-border-color;
    }
  }
  .tabs-content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 20px;
    right: 0;
    padding: 10px 15px 20px 15px;
    box-sizing: border-box;
    color: #fff;
  }
}
</style>