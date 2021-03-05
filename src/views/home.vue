<!--  -->
 <template>
  <div class="home-main">
    <a-input v-model:value="name" />
    <br /><br /><br /><br />
    <div>{{name}}</div>
  </div>
</template>

<script >
import { ref } from 'vue'
export default {
  setup(props, context) {
    const name = ref('姓名')
    const methods = {
      close1() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log('关闭')
            resolve(true)
          }, 3000)
        })
      }
    }
    return {
      ...methods,
      name
    }
  }
}

  </script>
  <style lang='scss' scoped>
.home-main {
  color: $primary-font-color;
}
</style>