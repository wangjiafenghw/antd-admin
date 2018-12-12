import React, { PureComponent } from 'react'

import { Table, Divider, Tag, Popover } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { serverUrl, apiPrefix } from '../../../../utils/config'
import copy from 'copy-to-clipboard';
import { Timer as LocalTimer} from "../../../../components/LocalTrans/LocalTrans"


@withI18n()
@connect(({ app }) => ({
    app: app,
}))
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
    handlePreview = (record, e) => {
        e.preventDefault();
        const path = `${serverUrl}${record.url}`
        window.open(path);
    }
    handleClickDelete = (record, index, e) => {
        e.preventDefault();
        this.props.handleDelete(record._id, index)
    }
    componentDidMount(){
        const { i18n } = this.props;
        const columns = [{
                title: i18n.t`fileName`,
                dataIndex: 'fileName',
                key: 'fileName',
                render: text => <a href="javascript:;">{text}</a>,
            }, {
                title: i18n.t`Owner`,
                dataIndex: 'owner',
                key: 'owner',
                render: text => <Tag color="#2db7f5">{i18n.t`${text}`}</Tag> // ???
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
                    <a onClick={this.handleClickDelete.bind(this, record, index)}><Trans>Delete</Trans></a>
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