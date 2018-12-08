
import { uploadCommit } from 'api'

export default {
  namespace: 'upload',

  state: {},

  effects: {
    *uploadCommit({ payload }, { put, call, select }) {
      const data = yield call(uploadCommit, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.success) {
        const { from } = locationQuery
      } else {
        throw data
      }
    },
  },
}
