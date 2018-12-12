
import { getFilesList, removeUploadFileById } from 'api'
import modelExtend from 'dva-model-extend'
import { model } from 'utils/model'

export default modelExtend(model, {
  namespace: 'list',
  state: {
    array: []
  },
  effects: {
    *getFilesList({ payload }, { call, put }) {
        const data = yield call(getFilesList, payload)
        const success = data.success;       
        if(success){
          yield put({
            type: 'updateState',
            payload: {
              array: data.data
            }
          })
        }
    },
    *deleteFileById({ payload }, { call, put }) {
      const data = yield call(removeUploadFileById, {id: payload.id})
      const success = data.success;
      if(success){
        let array = payload.list.array;
        array.splice(payload.index,1)
        yield put({
          type: 'updateState',
          payload: {
            array   //?? 父组件不刷新
          }
        })
        console.log(payload)
      }
    }
  },

})
