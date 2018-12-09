
import { getFilesList } from 'api'
import { callbackify } from 'util';

export default {
  namespace: 'list',

  state: {},
  effects: {
    *getFilesList({ payload }, { call, put }) {
        const data = yield call(getFilesList, payload)
        yield put({ type: getFilesList, payload: data})
    }
  },
}
