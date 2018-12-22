import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { connect } from 'dva'

import styles from './index.less'

@withI18n()
@connect()
export default class App extends PureComponent{
    render(){
        const { fileName, url, visit } = this.props.data;
        let html;
        if(visit){
            html = 
            <a className={styles.wrap} href={url}>
                <img className = {styles.cover} alt="example" src={ url } />
                <p>{ fileName }</p>
            </a>
        }else{
            html = 
            <a className={styles.wrap} href={url}>
                <img className = {styles.cover} alt="example" src={ url } />
                <div className={styles.locked} ></div>
                <p>{ fileName }</p>
            </a>
        }
        return html
    }
}