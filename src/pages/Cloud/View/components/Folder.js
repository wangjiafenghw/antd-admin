import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { connect } from 'dva'
import { Tooltip } from 'antd';


import styles from './index.less'

@withI18n()
@connect()
export default class App extends PureComponent{
    render(){
        const { name, visit } = this.props.data;
        let html;
        if(visit){
            html = 
            
                <a className={styles.wrap}>
                    <img className = {styles.cover} alt="example" src="http://localhost:1234/cloud/common/3bdf042f82787.png" />
                    <p>{ name }</p>
                </a>
        
        }else{
            html = 
            
                <a className={styles.wrap}>
                    <img className = {styles.cover} alt="example" src="http://localhost:1234/cloud/common/3bdf042f82787.png" />
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