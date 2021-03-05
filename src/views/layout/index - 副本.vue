<!--  -->
<template>
  <section class="layout">
    <header class="layout-header">
      <base-menu></base-menu>
      <tool-bar @addModal="addModal()"></tool-bar>
    </header>
    <section class="layout-main">
      <!-- <section class="left-tabs" :style="tabsStyleObject">
        <left-tabs @tabClick="tabClick"></left-tabs>
      </section>
      <section class="layout-main-content">
        <content-tabs :tabs-data="tabsData" @removeTabs="removeTabs"></content-tabs>
      </section> -->
      <!-- 左侧吸附菜单 -->
      <!-- horizontal -->
      <splitpanes class="splitpanes-item">
        <pane min-size="20" max-size="80" size="20">
          <div class="pane-item">
            <section class="left-tabs" :style="tabsStyleObject">
              <left-tabs @tabClick="tabClick"></left-tabs>
            </section>
          </div>
        </pane>
        <pane>
          <section class="layout-main-content">
            <content-tabs :tabs-data="tabsData" @removeTabs="removeTabs"></content-tabs>
          </section>
        </pane>
      </splitpanes>

    </section>
    <!-- 弹窗事件 -->
    <template v-for="item in modalData" :key="item.id">
      <BaseModal :data="item" :dialogStyle="item.style" @click="mesh++" :mesh="mesh" @close="closeModal" />
    </template>

  </section>
</template>

<script >
import { reactive, toRefs, computed } from 'vue'
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
import 'splitpanes/dist/splitpanes.css'

export default {
  name: 'layout',
  components: {
    BaseMenu,
    ToolBar,
    LeftTabs,
    ContentTabs,
    BaseModal,
    Splitpanes, Pane
  },
  setup() {
    const state = reactive({
      currentKey: 'alipay',
      collapsed: false,
      mesh: 2,//当前modal zIndex 值
      modalData: [{
        title: '主视图',
        id: 'home',
        pathName: 'home',
        style: {
          width: '3600px',
          height: '3500px'
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
        title: '新增',
        id: 1,
        pathName: '',
        closable: true
      }]
    })
    const privateComputed = {
      //收缩左侧吸附菜单
      tabsStyleObject: computed(() => {
        return {
          width: state.collapsed ? '70px' : '280px'
        }
      }),
    }
    const methods = {
      //打卡 modal
      addModal() {
        state.modalData.push({
          title: 'modal',
          id: +new Date(),
          pathName: 'home'
        })
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
       * @param {Boolean} collapsed 当前点击是否为同一个tab
       */
      tabClick: collapsed => {
        state.collapsed = collapsed
      },
      /**
       * 移除tabs
       * @param {String} currentIndex 移除tab 下标
       */
      removeTabs: currentIndex => {
        currentIndex !== -1 && state.tabsData.splice(currentIndex, 1)
        // state.tabsData.push({
        //   title: '导弹',
        //   closable: true,
        //   id: +new Date()
        // })
      }
    }
    return {
      ...methods,
      ...privateComputed,
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
    flex: auto;
    position: relative;
    display: flex;
    flex-direction: row;
    .splitpanes-item {
      height: 100%;
      width: 100%;
      .pane-item {
        width: 100%;
        height: 100%;
      }
    }
    .left-tabs {
      // width: 280px;
      width: 100%;
      position: relative;
      transition: width 0.3s;
    }
    &-content {
      flex: auto;
      border-left: 2px solid rgb(0, 150, 240);
      // background: #ececec;
    }
  }
}
</style>
