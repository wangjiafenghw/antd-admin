import React, { PureComponent } from 'react'
import File from './File'
import Folder from './Folder'
import { withI18n } from '@lingui/react'
import { connect } from 'dva'

import styles from './index.less'
@withI18n()
@connect()
export default class App extends PureComponent{
    componentWillMount(){
        
    }
    render(){
        const data = this.props.dataSource
        let arr = [];
        for(let i=0;i<data.length;i++){
            let item = data[i]
            if(item.isDir){
                arr.push(<Folder data={item} />)
            }else{
                arr.push(<File data={item} />)
            }
        }
        return (
            <div>
                { arr }
            </div>
        )
    }
}
