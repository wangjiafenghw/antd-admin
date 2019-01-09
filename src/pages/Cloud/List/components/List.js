import React, { PureComponent } from 'react'

import { Table, Divider, Tag, Popover, message, Spin } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { serverUrl, apiPrefix } from '../../../../utils/config'
import copy from 'copy-to-clipboard';
import { Timer as LocalTimer } from "../../../../components/LocalTrans/LocalTrans"
import Drawer from "./Drawer"

const filters = {
    permission: {
        "0": "common",
        "1": "other"
    }
}

@withI18n()
@connect(({ app, loading, list }) => ({
    app: app,
    loading: loading,
    _id: app.user._id,
    list: list.array,
    pagination: {
        pageSize: 10,
        current: list.current || 1,
        total: list.count || 0
    },
}))
export default class List extends PureComponent{
    constructor(){
        super()
        this.state = {
            editor_open: false
        }
    }
    onClose = () => {
        this.setState({
            editor_open: false,
            editor_record: {}
        });
    };
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
    handleClickEditor = (record, e) => {
        this.setState({ editor_open: true })
        this.setState({ editor_record: record })
    }
    handleClickCopyLink = (record, e) => {
        e.preventDefault();
        console.log(record)
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
        this.handler_getList({id: _id, ...this.props.pagination})  //默认获取登陆用户的文件列表
    }
    
    render(){
        const { list, i18n, pagination, loading } = this.props;
        const columns = [{
            title: i18n.t`FileName`,
            dataIndex: 'fileName',
            key: 'fileName',
            render: (text, record) => <a onClick={this.handlePreview.bind(this, record)}><Trans>{text}</Trans></a>,
        }, {
            title: i18n.t`Permission`,
            dataIndex: 'permission_code',
            key: 'permission_code',
            filters: [
                { text: 'Common', value: '0' },
                { text: 'Others', value: '1' },
            ],
            width: '10%',
            render: (text, record) => <Tag color={record.permission_code=="0"?"#2db7f5":"#f50"}>{filters.permission[i18n.t`${text}`]}</Tag>
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
                <a onClick={this.handleClickEditor.bind(this, record)} ><Trans>Editor</Trans></a>
                <Divider type="vertical" />
                <Popover placement="topLeft" content="copied!" trigger="click">
                    <a disabled = {record.permission_code!=="0"} onClick={this.handleClickCopyLink.bind(this, record)} >
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
            <Spin spinning={loading.effects['list/getFilesList']}>
                <Table rowKey={record=>record._id} pagination={ pagination } dataSource={list} columns={columns} onChange={this.onChange} />
                <Drawer visible = { this.state.editor_open } onClose = { this.onClose } record = { this.state.editor_record }/>
            </Spin>
        )
    }
}