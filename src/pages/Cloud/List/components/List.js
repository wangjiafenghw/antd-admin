import React, { PureComponent } from 'react'

import { Table, Divider, Tag, Popover } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { serverUrl, apiPrefix } from '../../../../utils/config'
import copy from 'copy-to-clipboard';

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
        copy(`${serverUrl}${record.url}`)
    }
    componentDidMount(){
        const { i18n } = this.props;
        const columns = [{
            title: `Id`,
            dataIndex: '_id',
            key: '_id',
            }, {
            title: i18n.t`fileName`,
            dataIndex: 'fileName',
            key: 'fileName',
            render: text => <a href="javascript:;">{text}</a>,
            }, {
            title: i18n.t`Owner`,
            dataIndex: 'owner',
            key: 'owner',
            render: text => <Tag color="#2db7f5">{i18n.t`${text}`}</Tag> // ???
            }, {
            title: i18n.t`Action`,
            key: 'action',
            render: (text, record) => (
                <span>
                <a href="javascript:;"><Trans>Preview</Trans></a>
                <Divider type="vertical" />
                <a onClick={this.handleClickCopyLink.bind(this, record)} >
                <Popover placement="topLeft" content="copied!" trigger="click">
                    <Trans>CopyLink</Trans>
                </Popover>
                </a>
                <Divider type="vertical" />
                <a onClick={this.handleClickDownload.bind(this, record)} ><Trans>Download</Trans></a>
                <Divider type="vertical" />
                <a href="javascript:{this.handleClick(record)};"><Trans>Delete</Trans></a>
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