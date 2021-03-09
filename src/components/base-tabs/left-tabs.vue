<!-- 左侧吸附菜单 -->
<template>
  <div class="left-tabs-com">
    <!-- ,{'collapsed-content':collapsed} -->
    <a-tabs tab-position="left" animated :class="['left-tabs-content']" @tabClick="tabClick" :tabBarStyle="{margin:0}"
      v-model:activeKey="activeKey">
      <a-tab-pane v-for="item in tabsData" :key="item.id">
        <template #tab>
          <span class="tab-title" v-html="item.title.split('').join('<br/>')"></span>
        </template>
        <div class="tabs-content">
          <header class="tabs-content-header">
            <span class="title">{{item.title}}</span>
            <CloseOutlined @click="colsePane()" class="close-icon" />
          </header>
          <main class="tabs-content-main" ref="mainRef">
            <div v-for="item in  mockTabContentData" :key="item.id" class="tabs-content-item"
              @click="item.show=!item.show">
              <header>{{item.title}}</header>
              <transition name="slide">
                <section class="tabs-content-item-main" v-if="item.show">
                  第三方地方
                </section>
              </transition>
            </div>

          </main>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { CloseOutlined } from '@ant-design/icons-vue';
import { reactive, toRefs, ref, onMounted } from 'vue'
//mock tabs 数据
const tabsData = [{
  title: '页面管理器',
  show: false,
  id: '1'
}, {
  title: '自定义页面',
  show: false,
  id: '2'
}, {
  title: '搜索',
  show: false,
  id: '3'
}]

export default {
  name: 'left-tabs',
  components: {
    CloseOutlined
  },
  setup(props, context) {
    const state = reactive({
      activeKey: '1',
      mockTabContentData: [{
        title: '公共显示',
        id: 0,
        show: false
      }, {
        title: '关键弧断',
        id: 1,
        show: false
      }, {
        title: '公共显示',
        id: 0,
        show: false
      }],
      collapsed: false,
    })
    const { emit } = context
    const methods = {
      //关闭左侧悬浮窗
      colsePane() {
        emit('colsePane')
      },
      /**
       * tab点击回调
       * @param {*} activeKety 当前点击tab key
       */
      tabClick: activeKey => {
        state.activeKey = activeKey
        emit('tabClick')
      }
    }

    return {
      tabsData,
      ...methods,
      ...toRefs(state),
    }
  },
}
</script>
<style lang="scss" scoped>
.slide-enter-active {
  animation: slider 0.2s;
}
.slide-leave-active {
  animation: slider 0.2s reverse;
}

.left-tabs-com {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(-50%);
  z-index: 1;
  background-color: rgb(0, 31, 51);
  .collapsed-content {
    ::v-deep {
      .ant-tabs-content {
        display: none;
      }
    }
  }
  .left-tabs-content {
    height: 100%;
    display: flex;
    flex-direction: row;
    .tabs-content {
      width: 100%;
      height: 100%;
      min-width: 150px;
      overflow: hidden;
      .tabs-content-header {
        @include normal-padding();
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid $primary-border-color;
        color: $primary-font-color;
        .title {
          flex: auto;
          @include major-text-ellipsis();
        }
        .close-icon {
          padding: 0 5px;
        }
      }
      .tabs-content-main {
        height: calc(100% - 33px);
        @include normal-padding();
        overflow: auto;
        color: $primary-font-color;
        .tabs-content-item {
          margin-top: 10px;
          @include normal-padding();
          border-radius: 3px;
          background-color: rgb(48, 84, 133);
          header {
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: $primary-font-color;
            cursor: pointer;
          }
          .tabs-content-item-main {
            height: 200px;
            margin: 2px;
            border: 1px solid rgb(48, 84, 133);
            border-radius: 3px;
            overflow: auto;
            @include small-padding();
            font-size: 13px;
            color: $primary-font-color;
            background: #002945;
          }
        }
      }
    }
    ::v-deep {
      .ant-tabs-content {
        flex: auto;
      }
      .ant-tabs-tabpane {
        width: 100%;
        height: 100%;
      }
      .ant-tabs-left-content > .ant-tabs-tabpane-inactive {
        display: none;
      }
      .ant-tabs-tab-arrow-show {
        background-color: rgb(48, 84, 133);
      }
      .ant-tabs-left-content {
        padding-left: 0;
        border-left: 1px solid $primary-border-color;
      }
      svg {
        color: $primary-font-color;
      }
      .ant-tabs-tab-active {
        background-color: #305485;
        .tab-title {
          color: rgb(218, 146, 120);
        }
      }
      .ant-tabs-tab {
        margin: 0;
        border: 1px solid rgb(32, 97, 124);
        &:not(:nth-last-child(1)) {
          border-bottom: none;
        }
      }
      .ant-tabs-ink-bar {
        left: 0;
        width: 4px;
        background-color: rgb(218, 140, 120);
      }
      .ant-tabs-left-bar {
        border-right: 1px solid rgb(32, 97, 124);
      }
    }
  }
  .tab-title {
    color: $primary-font-color;
  }
}
</style>
