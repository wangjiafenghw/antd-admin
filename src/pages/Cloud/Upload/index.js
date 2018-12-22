import React, { PureComponent } from 'react'
import { Upload, Icon, message, Form, Input, Button, Row, Col, Avatar, Radio } from 'antd';
const { TextArea } = Input;
import { connect } from 'dva'
import { Page } from 'components';
import { Commit, UploadFile } from '../components/index'
import styles from './index.less'

const FormItem = Form.Item;

@connect(({ app }) => ({
  avatar: app.user.avatar,
  nickname: app.user.nickname,
}))
export default class Uploads extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      fileList: [],
      formData: {
        type: "0",
        fileName: '',
        desc: ''
      }
    }
  }
  handleFileListChange = (fileList) => {
    this.setState({ fileList })
  }

  render(){
      const formData = this.state.formData;
      console.log(styles)
      return(
        <Page inner>
            <UploadFile onChangeFileList = {this.handleFileListChange} />
            <br />
            <Commit formData = { formData } />
        </Page>
      )
  }
}
