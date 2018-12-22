
import { getFilesList, removeUploadFileById, editorFile } from 'api'
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
            ...payload,
            array: data.results,
            count: data.count
          }
        })
      }
    },
    *editorFile({ payload }, { call, put }) {
      
      const data = yield call(editorFile, payload)
      const success = data.success;
    },
    *deleteFileById({ payload }, { call, put }) {
      const data = yield call(removeUploadFileById, {id: payload.id})
    }
  },

})
