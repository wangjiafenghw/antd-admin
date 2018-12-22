
import { editorFile, removeUploadFile } from 'api'
import { callbackify } from 'util';

export default {
  namespace: 'upload',

  state: {},

  effects: {
    *editorFile({ payload }, { put, call, select }) {
      console.log(payload)
      const data = yield call(editorFile, payload)
      if (data.success) {
        console.log("data", data)
      } else {
        throw data
      }
    },
    *removeUploadFile({ payload, callback }, { call, select }) {
      const data = yield call(removeUploadFile, payload)
      callback(data)
    }
  },
}
