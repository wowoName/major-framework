<!--  -->
<template>
  <a-sub-menu :key="menuInfo.key" v-bind="$attrs">
    <template #title>
      <span>
        <!-- <MailOutlined /> -->
        <span class="menu-title">{{ menuInfo.title }}</span>
      </span>
    </template>
    <template v-for="item in menuInfo.children">
      <template v-if="!item.children">
        <a-menu-item :key="item.key">
          <!-- <PieChartOutlined /> -->
          <span class="menu-title">{{ item.title }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.key" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script>
import { reactive, toRefs, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { PieChartOutlined, MailOutlined } from '@ant-design/icons-vue'
export default {
  name: 'sub-menu',
  components: {
    PieChartOutlined,
    MailOutlined,
  },
  props: {
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, context) { },
}
</script>
<style lang="scss" scoped></style>
