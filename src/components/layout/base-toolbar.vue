<!--  -->
 <template>
  <div class="layout-shortcut-bar">
    <div v-for="item in toolData" :key="item.id" class="tool-bar-item">
      <span class="item-title">{{item.title}}</span>
      <ul class="bar-item-list">
        <li v-for="list in item.children" :key="list.id" @click.stop="clickTabs(list)">
          <i :class="['iconfont',list.icon]"></i>
          <span>{{list.title}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

  <script>
export default {
  name: 'base-toolbar',
  props: {
    toolData: {
      type: Array,
      default: () => [{
        id: 1,
        title: '新增',
        children: [{
          icon: 'iconchangjing',
          title: '新建场景',
          id: 'scenario',
          type: 'modal',
          params: {
            name: '新建场景',
            desc: '这是我的参数'
          }
        }, {
          icon: 'iconchangjing',
          title: '模板创建',
          id: 'template',
          type: 'modal'
        }]
      }, {
        id: 2,
        title: '1',
        children: [{
          icon: 'iconchangjing',
          title: '新建场景吧',
          id: 'scenario1',
          type: 'modal'
        }, {
          icon: 'iconchangjing',
          title: '模板创建吧',
          id: 'template1',
          type: 'modal'
        }]
      }]
    }
  },
  setup(props, context) {
    const { emit } = context
    const methods = {
      clickTabs(item) {
        !item?.params && (item.params = {})
        item.params.desc = "这是我的参数" + (+new Date())
        emit('clickMenu', item)
      }
    }
    return {
      ...methods
    }
  },
}
  </script>
  <style lang='scss' scoped>
.layout-shortcut-bar {
  height: calc(100% - 50px);
  padding: 11px 15px 5px;
  box-sizing: border-box;
  @include major-flex(flex-start);
  .tool-bar-item {
    height: 100%;
    min-width: 80px;
    margin-right: 15px;
    border: 1px solid $primary-border-color;
    border-radius: 5px;
    color: $primary-font-color;
    position: relative;
    .item-title {
      display: inline-block;
      position: absolute;
      top: -11px;
      left: 20px;
      max-width: calc(100% - 40px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background-color: $primary-bg-color;
      padding: 0 5px;
      font-size: 13px;
      cursor: pointer;
    }
    .bar-item-list {
      @include major-flex(space-around);
      padding: 2px 10px;
      height: 100%;

      li {
        cursor: pointer;
        &:not(:nth-child(1)) {
          margin-left: 15px;
        }
        @include major-flex(center);
        flex-direction: column;

        i {
          font-size: 25px;
          color: $primary-font-color;
          transition: transform 0.2s;
          &:hover {
            transform: scale(1.1);
          }
        }
        span {
          font-size: small;
          color: $color-secondary;
        }
      }
    }
  }
}
</style>