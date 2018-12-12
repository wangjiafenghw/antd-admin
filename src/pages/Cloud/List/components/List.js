import React, { PureComponent } from 'react'

import { Table, Divider, Tag } from 'antd'
import { withI18n } from '@lingui/react'
import { serverUrl, apiPrefix } from '../../../../utils/config'

@withI18n()

export default class List extends PureComponent{
    constructor(){
        super()
        this.state = {
            columns: []
        }
    }
    handleClickDownload = (record, e) => {
        e.preventDefault();
        const path = `${apiPrefix}/cloud/download/${record._id}`
        window.open(path, '_self');
    }
    handleClickCopyLink = (record, e) => {
        e.preventDefault();
        const path = `${apiPrefix}/cloud/download/${record._id}`
        window.open(path, '_self');
    }
    componentDidMount(){
        const columns = [{
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
            }, {
            title: 'Url',
            dataIndex: 'url',
            key: 'url',
            render: text => <a target="_blank" href={serverUrl+text}>{text}</a>,
            }, {
            title: 'Owner',
            dataIndex: 'owner',
            key: 'owner',
            }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                <a href="javascript:;">Preview</a>
                <Divider type="vertical" />
                <a onClick={this.handleClickCopyLink.bind(this, record)} >CopyLink</a>
                <Divider type="vertical" />
                <a onClick={this.handleClickDownload.bind(this, record)} >Download</a>
                <Divider type="vertical" />
                <a href="javascript:{this.handleClick(record)};">Delete</a>
                </span>
            ),
        }];
        this.setState({columns})
    }
    render(){
        const {list} = this.props;
        const {columns} = this.state;
        return(
            <Table rowKey={record=>record._id} dataSource={list} columns={columns} />
                
        )
    }
}