
import { uploadCommit, removeUploadFile } from 'api'
import { callbackify } from 'util';

export default {
  namespace: 'upload',

  state: {},

  effects: {
    *uploadCommit({ payload }, { put, call, select }) {
      const data = yield call(uploadCommit, payload)
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
