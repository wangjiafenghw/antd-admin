import React, { PureComponent } from 'react'
import { Page } from 'components';

import List from './components/List';

import { connect } from 'dva'
import { withI18n } from '@lingui/react'

@withI18n()
@connect(({app})=>({
    _id: app.user._id,
}))
export default class ListApp extends PureComponent {
    render(){
        return (
            <Page inner>
                <List />
            </Page>
        )
    }
}