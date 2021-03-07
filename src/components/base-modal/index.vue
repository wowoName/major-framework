<!--  -->
 <template>
  <div :class="['major-modal-com',{'major-opacity':opacity}]" :style="currentStyle" @click="clickModal()"
    ref="modalCon">
    <transition name="bounce" mode="out-in">
      <div class="major-modal" v-if="animation">
        <header class="modal-title" ref="header">
          <span class="modal-title-item">{{data.title}}</span>
          <a-tooltip title="关闭" placement="right">
            <LoadingOutlined v-if="closeLoading" />
            <CloseOutlined @click.prevent.stop="closeModal()" v-else />
          </a-tooltip>
        </header>
        <div class="modal-content">
          {{currentParams}}--
          <br>
          <br>
          {{params}}
          <BaseComponent :path-name="data.pathName" :params="JSON.stringify(params)" ref="component" />
        </div>
      </div>
    </transition>
    <div class="resize-left" @mousedown="dragResize" data-type='left'></div>
    <div class="resize-right" @mousedown="dragResize" data-type='right'></div>
    <div class="resize-bottom" @mousedown="dragResize" data-type='bottom'></div>
  </div>
</template>

  <script>
import { reactive, toRefs, computed, watch, onMounted, onBeforeUnmount, nextTick, ref } from 'vue'
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import BaseComponent from '@/components/baseContainer.vue'
export default {
  components: {
    BaseComponent,
    CloseOutlined,
    LoadingOutlined
  },
  props: {
    //参数
    params: {
      type: Object,
      default: () => ({})
    },
    //zIndex
    mesh: Number,
    zIndex: Number,
    //样式
    dialogStyle: {
      type: Object,
      default: () => ({})
    },
    //当前是否透明
    opacity: Boolean,
    data: {
      type: Object,
      default: () => ({
        title: 'modal',
        id: 'modals',
        pathName: 'home',
      })
    }
  },
  setup(props, context) {
    let clientRect = {
      height: 0,
      width: 0
    }
    const { emit } = context
    //header ref
    const header = ref(null)
    //root ref
    const modalCon = ref(null)
    //path ref
    const component = ref(null)
    const state = reactive({
      visible: true,
      closeLoading: false,
      animation: false,
      currentParams: props.params,
      //样式
      currentStyle: Object.assign({}, props.dialogStyle),
      aaaa: {}
    })
    //拖拽数据
    const dragHandlerData = {
      mouseDownX: 0,
      mouseDownY: 0
    }
    //resize 数据
    let resizeRect = {
      x: 0,
      y: 0
    }
    //移动容器DOM
    let contain = null
    const dragEvent = {
      handleMove(event) {
        const minBoundaryValue = 46
        let left = event.pageX - dragHandlerData.mouseDownX,
          top = event.pageY - dragHandlerData.mouseDownY,
          maxTop = clientRect.height - minBoundaryValue,//46为标题高度
          maxRight = clientRect.width - minBoundaryValue;//clientRect.containerWidth
        //禁止超过上边界
        top < 0 && (top = 0);
        //   (top + clientRect.containerHeight) < minBoundaryValue && (top = -clientRect.containerHeight + minBoundaryValue);
        //禁止超过下边界
        top > maxTop && (top = maxTop);
        //禁止超过右侧
        left > maxRight && (left = maxRight);
        //禁止超过左侧
        (left + clientRect.containerWidth) < minBoundaryValue && (left = - clientRect.containerWidth + minBoundaryValue);

        state.currentStyle.top = `${top}px`
        state.currentStyle.left = `${left}px`
      },
      initialEvent() {
        contain.addEventListener('mousedown', function (e) {
          dragHandlerData.mouseDownX = e.pageX - modalCon.value.offsetLeft
          dragHandlerData.mouseDownY = e.pageY - modalCon.value.offsetTop
          if (state.currentStyle.zIndex !== props.mesh) {
            let zIndex = props.mesh
            state.currentStyle.zIndex = ++zIndex
            emit('clickPane')
          }
          //当前容器大小
          const modalConRect = modalCon.value.getBoundingClientRect()
          clientRect.containerWidth = modalConRect.width;
          clientRect.containerHeight = modalConRect.height;
          document.addEventListener('mousemove', dragEvent.handleMove, false)
          document.addEventListener('mouseup', dragEvent.removeMove, false)
        })
      },
      removeMove() {
        document.removeEventListener('mousemove', dragEvent.handleMove, false)
        document.removeEventListener('mouseup', dragEvent.removeMove, false)
      },
    }
    const methods = {
      //modal点击事件 当前modal置顶
      clickModal() {
        // emit('clickPane')
        // let zIndex = props.mesh
        // state.currentStyle.zIndex = ++zIndex
      },
      //关闭modal
      async closeModal() {
        state.closeLoading = true
        const response = await component.value.close()
        console.log(response)
        state.animation = false
        setTimeout(() => {
          emit('close', props.data.id)
        }, 500)

      },
      //縮放modal
      dragResize(event) {
        const target = event.target;
        let mouseDownX = event.pageX - target.offsetLeft,
          mouseDownY = event.pageY - target.offsetTop;

        resizeRect = {
          x: mouseDownX,
          y: mouseDownY,
          left: target.offsetLeft,
          width: target.parentNode.offsetWidth,
          type: target.dataset.type
        }
        document.addEventListener('mousemove', setModalRect, false)
        document.addEventListener('mouseup', removeResizeEVent, false)
      },
    }
    //移除resize 相关事件
    function removeResizeEVent() {
      document.removeEventListener('mousemove', setModalRect, false)
      document.addEventListener('mouseup', removeResizeEVent, false)
    }
    //
    function setModalRect(e) {
      const type = resizeRect.type
      let width = e.pageX - resizeRect.x,
        height = e.pageY - resizeRect.y;
      type === 'left' && (width = resizeRect.width + resizeRect.x - e.pageX);

      width < 200 && (width = 200);
      type === 'bottom' && height < 200 && (height = 200);

      type === 'left' && (state.currentStyle.left = e.pageX + 'px');
      (['left', 'right'].includes(type)) && (state.currentStyle.width = width + 'px');

      type === 'bottom' && (state.currentStyle.height = height + 'px')
    }
    //计算当前modal 样式
    function getCurrentStyleObj() {
      const rootRect = modalCon.value.getBoundingClientRect();
      let width = rootRect.width,
        height = rootRect.height,
        currentStyle = {};
      if (width > clientRect.width) {
        currentStyle.width = clientRect.width + 'px'
        width = clientRect.width
      }
      if (height > clientRect.height) {
        currentStyle.height = clientRect.height + 'px'
        height = clientRect.height
      }
      let left = (clientRect.width - width) / 2 + 'px',
        top = (clientRect.height - height) / 2 + 'px'

      state.currentStyle = Object.assign({}, state.currentStyle, currentStyle, {
        top: top,
        left: left,
        zIndex: props.zIndex
      })
    }

    //监听 zIndex 变化，打开已经打开的modal时 置顶
    watch(
      () => props.zIndex,
      value => {
        state.currentStyle.zIndex !== props.zIndex && (state.currentStyle.zIndex = value + 1)
      },
      {
        deep: true
      }
    )
    onMounted(() => {
      state.animation = true
      //外容器大小
      let modalConParentRect = modalCon.value.parentNode.getBoundingClientRect();
      clientRect = {
        height: modalConParentRect.height,
        width: modalConParentRect.width
      }
      nextTick(() => {
        //计算位置
        getCurrentStyleObj()
        contain = header.value;
        //初始化拖拽事件
        dragEvent.initialEvent();
      })

    })
    return {
      modalCon,
      header,
      component,
      ...toRefs(state),
      ...methods
    }
  },
}
  </script>
  <style lang='scss' scoped>
.bounce-enter-active {
  animation: modelanimation 0.2s;
}
.bounce-leave-active {
  animation: modelanimation 0.2s reverse;
}
.major-opacity {
  opacity: 0;
}
.major-modal-com {
  position: absolute;
  width: 600px;
  height: 400px;
  border-radius: 3px;
  z-index: 1;
  padding: 0 2px 2px 2px;
  box-sizing: border-box;
  .resize-left {
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    cursor: col-resize;
  }
  .resize-right {
    position: absolute;
    top: 0;
    right: 0;
    width: 3px;
    height: 100%;
    cursor: col-resize;
  }
  .resize-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    cursor: n-resize;
  }
  .major-modal {
    width: 100%;
    height: 100%;
    background-color: #00536e;
    box-shadow: 0 4px 12px #2f3e52;
    border-radius: 2px;
    z-index: 1;
    .modal-title {
      width: 100%;
      border-bottom: 1px solid #305485;
      @include large-padding();
      border-radius: 2px;
      display: flex;
      align-items: center;
      flex-direction: row;
      background: linear-gradient(to bottom, #0f6a88, #063e51);
      @include major-text-ellipsis();
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      cursor: pointer;
      .modal-title-item {
        flex: auto;
      }
    }
    .modal-content {
      height: calc(100% - 46px);
      @include large-padding();
      overflow: auto;
    }
  }
}
</style>