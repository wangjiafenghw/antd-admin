import React, { PureComponent } from 'react'
import { Page } from 'components';

import { List } from 'antd';

import { connect } from 'dva'
import { withI18n } from '@lingui/react'

@withI18n()
@connect(({app, list})=>({
    _id: app.user._id,
    list
}))
export default class ListApp extends PureComponent {
    constructor(){
        super();
    }
    handler_getList(){
        const { dispatch, _id } = this.props;
        dispatch({ type: 'list/getFilesList', payload: {id: _id, }} )
    }

    componentDidMount(){
        this.handler_getList()
        
    }
    render(){
        const { list } = this.props
        return (
            <Page inner>
                <List
                    size="large"
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={list.array}
                    renderItem={item => (<List.Item>{JSON.stringify(item)}</List.Item>)}
                />
            </Page>
        )
    }
}