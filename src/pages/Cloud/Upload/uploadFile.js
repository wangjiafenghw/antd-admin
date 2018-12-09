import React, { PureComponent } from 'react'
import { Upload, Icon, message } from 'antd';
import { upload as upload_option } from '../../../utils/option'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'

const Dragger = Upload.Dragger;

@withI18n()
@connect(({ app }) => ({
    _id: app.user._id,
}))

export default class UploadFile extends PureComponent{
    constructor(props){
        super(props)
    }

    handleFileListChange = (info) => {
        this.props.onChangeFileList(info.fileList)
    }
    handleRemoveUploadFile = (file, callback) => {
        console.log(file)
        const { dispatch, _id } = this.props
        dispatch({ type: 'upload/removeUploadFile', payload: {filePath: file.response.saveTo.url, user_id: _id}, callback })
    }

    render(){
        
        const uploadOption = {
          ...upload_option,
          onChange: (info) => {
            const status = info.file.status;
            this.handleFileListChange(info)
            if (status !== 'uploading') {
            //   console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                console.log(info)
              message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          },
          onRemove: (file) => {
              this.handleRemoveUploadFile(file, (data) => {
                if (data.success) {
                  message.success(`${file.name} file remove successfully.`);
                } else {
                  message.error(`${file.name} file remove failed.`);
                }
              });
          }
        };
        return(
            <Dragger {...uploadOption}>
                <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
            </Dragger>
        )
    }
}
