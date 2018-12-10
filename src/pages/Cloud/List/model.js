
import { getFilesList } from 'api'
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
    }
  },

})
