import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { connect } from 'dva'
import { Tooltip } from 'antd';

import styles from './index.less'

@withI18n()
@connect()
export default class App extends PureComponent{
    render(){
        const { name, url, visit } = this.props.data;
        let html;
        if(visit){
            html = 
            <a className={styles.wrap} href={url}>
                <img className = {styles.cover} alt="example" src={ url } />
                <p>{ name }</p>
            </a>
        }else{
            html = 
            <a className={styles.wrap} href={url}>
                <img className = {styles.cover} alt="example" src={ url } />
                <div className={styles.locked} ></div>
                <p>{ name }</p>
            </a>
        }
        return (
            <Tooltip title="demo">
                {html}
            </Tooltip>
        )
    }
}