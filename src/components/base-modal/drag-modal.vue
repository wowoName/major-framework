<!--  -->
 <template>
  <div ref="modal">
    <div class="major-modal" v-for="item in currentModalData" :key="item.id">
      <BaseComponent :path-name="item.pathName" />
    </div>
  </div>
</template>

  <script>
import { reactive, toRefs, computed, watch, onMounted, onBeforeUnmount, ref } from 'vue'
import BaseComponent from '@/components/baseContainer.vue'
export default {
  components: {
    BaseComponent
  },
  props: {
    modalData: {
      type: Array,
      default: () => []
    }
  },
  setup(props, context) {
    const modal = ref(null)
    const state = reactive({
      visible: true
    })
    const defaultModalData = [{
      title: '主视图',
      id: 'home',
      pathName: 'home',
      closable: false
    }]
    //modal 数据
    const currentModalData = computed(() => {
      return [...defaultModalData, ...props.modalData]
    })
    //拖拽数据
    const dragHandlerData = {
      mouseDownX: 0,
      mouseDownY: 0
    }
    //移动容器DOM
    let contain = null
    const methods = {
      handleMove(event) {
        const delta1X = event.pageX - dragHandlerData.mouseDownX,
          delta1Y = event.pageY - dragHandlerData.mouseDownY
        contain.style.cssText = `top:${delta1Y}px;left:${delta1X}px`
      },
      initialEvent() {
        contain.addEventListener('mousedown', function (e) {
          dragHandlerData.mouseDownX = e.pageX - contain.offsetLeft
          dragHandlerData.mouseDownY = e.pageY - contain.offsetTop
          document.addEventListener('mousemove', methods.handleMove, false)
        })
        document.addEventListener('mouseup', methods.removeMove, false)
      },
      removeMove() {
        document.removeEventListener('mousemove', methods.handleMove, false)
      },
    }
    onMounted(() => {
      contain = modal.value;
      console.log(contain)
      methods.initialEvent();
    })

    return {
      modal,
      currentModalData,
      ...toRefs(state)
    }
  },
}
  </script>
  <style lang='scss' scoped>
.major-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  z-index: 5;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border: 1px solid #ececec;
  box-shadow: 0 1px 3px #ececec;
}
</style>