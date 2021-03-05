<!--  -->
 <template>
  <div class="major-modal" ref="modalCon" :style="currentStyle" @click="clickModal()">
    <header class="modal-title" ref="header">
      <span class="modal-title-item">{{data.title}}</span>
      <a-tooltip title="关闭" placement="right">
        <LoadingOutlined v-if="closeLoading" />
        <CloseOutlined @click="closeModal()" v-else />
      </a-tooltip>
    </header>
    <div class="modal-content">
      <BaseComponent :path-name="data.pathName" ref="component" />
    </div>
  </div>
</template>

  <script>
import { reactive, toRefs, computed, watch, onMounted, onBeforeMount, ref } from 'vue'
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import BaseComponent from '@/components/baseContainer.vue'
export default {
  components: {
    BaseComponent,
    CloseOutlined,
    LoadingOutlined
  },
  props: {
    //zIndex
    mesh: Number,
    //样式
    dialogStyle: {
      type: Object,
      default: () => ({})
    },
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
    const clientRect = {
      height: document.body.clientHeight,
      width: document.body.clientWidth
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
      //样式
      currentStyle: Object.assign({}, props.dialogStyle)
    })
    //拖拽数据
    const dragHandlerData = {
      mouseDownX: 0,
      mouseDownY: 0
    }
    //移动容器DOM
    let contain = null
    const dragEvent = {
      handleMove(event) {
        const left = event.pageX - dragHandlerData.mouseDownX,
          top = event.pageY - dragHandlerData.mouseDownY,
          styleObje = contain.parentNode.style;
        state.currentStyle.top = `${top}px`
        state.currentStyle.left = `${left}px`

      },
      initialEvent() {
        contain.addEventListener('mousedown', function (e) {
          dragHandlerData.mouseDownX = e.pageX - contain.parentNode.offsetLeft
          dragHandlerData.mouseDownY = e.pageY - contain.parentNode.offsetTop
          contain.parentNode.style.zIndex = props.mesh
          document.addEventListener('mousemove', dragEvent.handleMove, false)
        })
        document.addEventListener('mouseup', dragEvent.removeMove, false)
      },
      removeMove() {
        document.removeEventListener('mousemove', dragEvent.handleMove, false)
      },
    }
    const methods = {
      //modal点击事件 当前modal置顶
      clickModal() {
        emit('click')
        contain.parentNode.style.zIndex = props.mesh
      },
      //关闭modal
      async closeModal() {
        state.closeLoading = true
        const response = await component.value.close()
        console.log(response)
        emit('close', props.data.id)

      }
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
        left: left
      })
    }

    onMounted(() => {
      //计算位置
      getCurrentStyleObj()
      contain = header.value;
      //初始化拖拽事件
      dragEvent.initialEvent();
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
.major-modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 600px;
  height: 400px;
  background-color: #00536e;
  box-shadow: 0 4px 12px #2f3e52;
  border-radius: 2px;
  animation: modelAnimation 2s 1 ease-out;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
@keyframes modelAnimation {
  0% {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
</style>