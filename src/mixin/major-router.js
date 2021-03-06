//事件总线
import emitter from 'tiny-emitter/instance'
import uuid from '../utils'
//打开路由
export default  function majorGo(pathInfos) {
    const defaultConfig={
        title: 'major',
        id: uuid(),
        type: 'tab',
        params: {
        }
    }
    emitter.emit('majorGo', Object.assign({},defaultConfig,pathInfos));
}