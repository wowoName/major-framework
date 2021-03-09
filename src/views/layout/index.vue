<!--  -->
<template>
  <section class="layout">
    <header class="layout-header">
      <base-menu @clickNavigation="clickMenu"></base-menu>
      <tool-bar @clickMenu="clickMenu"></tool-bar>
    </header>
    <section class="layout-main" ref="main">
      <splitpanes class=" splitpanes-item">
        <pane :min-size="paneMinSize" max-size="80" :size="paneSize">
          <div class="pane-item">
            <section class="left-tabs">
              <LeftTabs @tabClick="tabClick" @colsePane="()=>{paneSize=paneMinSize}" />
            </section>
          </div>
        </pane>
        <pane :size="paneSizeSibling" class="哈哈哈">
          <splitpanes horizontal>
            <pane>
              <div class="pane-item">
                <section class="layout-main-content">
                  <ContentTabs :tabs-data="tabsData" ref="contentTabs" @removeTabs="removeTabs" />
                </section>
              </div>
            </pane>
            <pane :min-size="btMinSize" :max-size="btMinSizeSibling" size="20">
              <div class="pane-item">
                <ContentTabs :tabs-data="bottomTabs" />
              </div>
            </pane>
          </splitpanes>
        </pane>
      </splitpanes>
    </section>

    <!-- 弹窗事件 -->
    <template v-for="item in modalData" :key="item.id">
      <!-- @vnode-mounted="mesh++" -->
      <BaseModal :data="item" :dialogStyle="item.style" :opacity="modalOpacity" @clickPane="mesh++"
        :params="item.params" :zIndex='item.zIndex' :mesh="mesh" @close="closeModal" />
    </template>
  </section>
</template>

<script >
import { reactive, toRefs, ref, computed, onMounted } from 'vue'
//导航栏
import BaseMenu from '@com/layout/base-menu.vue'
//快捷入口
import ToolBar from '@com/layout/base-toolbar.vue'
//左侧目录
import LeftTabs from '@com/base-tabs/left-tabs.vue'
//顶部标签页
import ContentTabs from '@com/base-tabs/content-tabs.vue'
//modal
import BaseModal from '@com/base-modal/index.vue'
import { Splitpanes, Pane } from 'splitpanes'
import emitter from 'tiny-emitter/instance'
export default {
  name: 'layout',
  components: {
    BaseMenu,
    ToolBar,
    LeftTabs,
    ContentTabs,
    BaseModal,
    Splitpanes,
    Pane
  },
  setup() {
    const state = reactive({
      currentKey: 'alipay',
      mesh: 2,//当前modal zIndex 值
      modalData: [{
        title: '主视图',
        id: 'home',
        pathName: 'home',
        style: {
          width: '360px',
          height: '350px'
        },
        params: {
          name: '主视图'
        }
      }, {
        title: '主视图2',
        id: 'home1',
        pathName: 'home',
        style: {
          width: '500px',
          height: '600px'
        }
      }],
      tabsData: [{
        title: '主视图',
        id: 'home',
        pathName: 'home',
        closable: false
      }, {
        title: 'lis',
        id: 1,
        pathName: 'lisIndex',
        params: {
          name: '名称'
        },
        closable: true
      }],
      bottomTabs: [{
        title: '输出',
        id: 'output',
        pathName: 'output',
        closable: false
      }, {
        title: '信息',
        id: 'message',
        pathName: 'message',
        closable: false
      }],
      paneSize: 30,
      paneMinSize: 10,
      btMinSize: 10,//左侧底部tab最小缩放至
      modalOpacity: false,//悬浮框是否透明
    })
    const main = ref(null)
    //左侧标签页ref
    const contentTabs = ref(null)
    const privateComputed = {
      paneSizeSibling: computed(() => 100 - state.paneMinSize),
      btMinSizeSibling: computed(() => 100 - state.btMinSize)
    }
    const methods = {
      opened() {
        console.log('打开了')
      },
      /**
       * 快捷菜单打开方式
       * @param {*} item 配置信息
       */
      clickMenu(item) {
        //打开方式默认为标签
        const type = item?.type ?? 'tab';
        type === 'tab' ? addTabs(item) : addModal(item);
      },
      /**
       * 关闭modal
       * @param {*} key 当前 modal key
       */
      closeModal(key) {
        const index = state.modalData.findIndex(v => v.id === key)
        index !== -1 && state.modalData.splice(index, 1)
      },
      /**
       * 左侧吸附菜单点击
       * 如果当前菜单关闭  设置打开比例为30
       * @param {Boolean} 
       */
      tabClick: () => {
        if (state.paneSize === state.paneMinSize)
          state.paneSize = 30
      },
      /**
       * 移除tabs
       * @param {String} currentIndex 移除tab 下标
       */
      removeTabs: currentIndex => {
        currentIndex !== -1 && state.tabsData.splice(currentIndex, 1)
      }
    }
    //打开一个tabs
    function addTabs(item) {
      let index = state.tabsData.findIndex(v => v.id === item.id)
      index === -1 && state.tabsData.push(item) && (index = state.tabsData.length - 1)
      contentTabs.value.setActiveKey(state.tabsData[index].id)
      if (index !== -1) {
        let data = state.tabsData[index]
        state.tabsData[index] = Object.assign({}, data, item)
      }
      //添加tabs 将悬浮的modal只为透明
      state.modalOpacity = true
      setTimeout(() => {
        state.modalOpacity = false
      }, 500)
    }
    //打开弹窗
    function addModal(item) {
      let index = state.modalData.findIndex(v => v.id === item.id)
      index === -1 && state.modalData.push(item) && (index = state.modalData.length - 1)
      !state.modalData[index]?.style && (state.modalData[index].style = {})
      if (index !== -1) {
        let data = state.modalData[index]
        state.modalData[index] = Object.assign({}, data, item)
      }
      let curIndex = state.modalData[index]?.zIndex ?? 0
      if (curIndex !== state.mesh)
        state.modalData[index].zIndex = ++state.mesh
    }

    onMounted(() => {
      //计算左侧吸附菜单最小值
      const mainRect = main.value.getBoundingClientRect()
      state.paneMinSize = 6400 / mainRect.width
      state.btMinSize = 4000 / mainRect.height
    })
    //事件总线 收到路由跳转信息
    emitter.on('majorGo', infos => {
      methods.clickMenu(infos)
      console.log('打开路由', infos)
    })
    return {
      main,
      ...privateComputed,
      contentTabs,
      ...methods,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="scss" scoped>
.layout {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: $primary-bg-color;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &-header {
    height: 140px;
    border-bottom: 2px solid $primary-border-color;
    display: flex;
    flex-direction: column;
  }
  &-main {
    // flex: auto;
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    .splitpanes-item {
      height: 100%;
      width: 100%;
      .pane-item {
        width: 100%;
        height: 100%;
        background-color: $primary-bg-color;
        overflow: auto;
      }
    }
    .left-tabs {
      // width: 280px;
      width: 100%;
      height: 100%;
      position: relative;
      transition: width 0.3s;
    }
    &-content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
