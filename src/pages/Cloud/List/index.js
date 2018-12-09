import React, { PureComponent } from 'react'
import { Page } from 'components';

import { List } from 'antd';

import { connect } from 'dva'
import { withI18n } from '@lingui/react'



@withI18n()
@connect()
export default class ListApp extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            list: [
                'Racing car sprays burning fuel into crowd.',
                'Japanese princess to wed commoner.',
                'Australian walks 100km after outback crash.',
                'Man charged over missing wedding girl.',
                'Los Angeles battles huge wildfires.',
            ]
        }
    }
    handler_getList(){
        const { dispatch } = this.props;
        dispatch({ type: 'list/getFilesList', payload: {id: '5bffa6919bd62b1cd4908f3a'} })
        console.log(this.state)
    }

    componentDidMount(){
        this.handler_getList()
    }

    render(){
        return (
            <Page inner>
                <List
                    size="large"
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={this.state.list}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
            </Page>
        )
    }
}