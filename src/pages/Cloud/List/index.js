import React, { PureComponent } from 'react'
import { Page } from 'components';

import List from './components/List';

import { connect } from 'dva'
import { withI18n } from '@lingui/react'

@withI18n()
@connect(({app, list})=>({
    _id: app.user._id,
    list
}))
export default class ListApp extends PureComponent {
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
                <List list={list.array} />
            </Page>
        )
    }
}