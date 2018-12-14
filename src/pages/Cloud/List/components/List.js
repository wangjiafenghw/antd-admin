import React, { PureComponent } from 'react'

import { Table, Divider, Tag, Popover, message } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { serverUrl, apiPrefix } from '../../../../utils/config'
import copy from 'copy-to-clipboard';
import { Timer as LocalTimer} from "../../../../components/LocalTrans/LocalTrans"


@withI18n()
@connect(({ app, list }) => ({
    app: app,
    _id: app.user._id,
    list: list.array
}))
export default class List extends PureComponent{
    constructor(){
        super()
        this.state = {
            pagination: {
                pageSize: 5,
                current: 1
            }
        }
    }
    handler_getList(param){
        const { dispatch } = this.props;
        dispatch({ type: 'list/getFilesList', payload: {...param}} )
    }
    handleDelete = async (record) => { 
        const { dispatch } = this.props;
        const { _id, fileName } = record;
        const removing = message.loading(`正在删除文件${fileName}...`, 0)
        await dispatch({ type: 'list/deleteFileById', payload: { id: _id }})
        removing();
        message.info(`删除文件${fileName}成功!`);
        await this.handler_getList()
    }
    handlePreview = (record, e) => {
        e.preventDefault();
        const path = `${serverUrl}${record.url}`
        window.open(path);
    }
    handleClickCopyLink = (record, e) => {
        e.preventDefault();
        copy(`${serverUrl}${record.url}`)
    }
    handleClickDownload = (record, e) => {
        e.preventDefault();
        const path = `${apiPrefix}/cloud/download/${record._id}`
        window.open(path, '_self');
    }
    handleClickDelete = (record, e) => {
        e.preventDefault();
        this.handleDelete(record)
    }
    onChange = (pagination, filters, sorter) => {
        this.handler_getList({...pagination, ...filters, ...sorter})
    }
    componentDidMount(){
        const { _id } = this.props;
        this.handler_getList({id: _id, ...this.state.pagination})  //默认获取登陆用户的文件列表
    }
    
    render(){
        const { list, i18n } = this.props;
        const { pagination } = this.state;
        const columns = [{
            title: i18n.t`FileName`,
            dataIndex: 'fileName',
            key: 'fileName',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: i18n.t`Permission`,
            dataIndex: 'permission',
            key: 'permission',
            filters: [
                { text: 'Common', value: 'common' },
                { text: 'Others', value: 'others' },
            ],
            width: '10%',
            render: text => <Tag color="#2db7f5">{i18n.t`${text}`}</Tag>
        },{
            title: i18n.t`Owner`,
            dataIndex: 'owner',
            key: 'owner',
            filters: [
                { text: 'Admin', value: 'admin' },
                { text: 'Others', value: 'others' },
            ],
            render: text => <Tag color="#2db7f5">{i18n.t`${text}`}</Tag> // ???permission
        },{
            title: i18n.t`UploadTime`,
            dataIndex: 'meta.updateAt',
            key: 'uploadTime.',
            render: text => <LocalTimer>{text}</LocalTimer>
        },{
            title: i18n.t`Action`,
            key: 'action',
            render: (text, record, index) => (
                <span>
                <a onClick={this.handlePreview.bind(this, record)}><Trans>Preview</Trans></a>
                <Divider type="vertical" />
                <Popover placement="topLeft" content="copied!" trigger="click">
                    <a onClick={this.handleClickCopyLink.bind(this, record)} >
                        <Trans>CopyLink</Trans>
                    </a>
                </Popover>
                <Divider type="vertical" />
                <a onClick={this.handleClickDownload.bind(this, record)} ><Trans>Download</Trans></a>
                <Divider type="vertical" />
                <a onClick={this.handleClickDelete.bind(this, record)}><Trans>Delete</Trans></a>
                </span>
            ),
        }]
        
        return(
            <Table rowKey={record=>record._id} pagination={ pagination } dataSource={list} columns={columns} onChange={this.onChange} />
        )
    }
}