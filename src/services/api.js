export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /user/login',

  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user/:id',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard',

  removeUploadFile: '/cloud/removeUploadFile',
  removeUploadFileById: '/cloud/removeUploadFileById',
  
  getFilesList: '/cloud/getFilesList',
  editorFile: '/cloud/editorFile'
}
