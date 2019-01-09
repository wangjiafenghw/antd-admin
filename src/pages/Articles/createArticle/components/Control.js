import React, { PureComponent } from "react"
import { Button, Row, Col } from 'antd'
import styles from "./Control.less"

export default class Control extends PureComponent{
    render(){
        return(
            <div className={styles.wrap}>
                <Row>
                    <Col span={16}>
                        
                    </Col>
                    <Col span={8}>
                        <Button>保存</Button>
                    </Col>
                </Row>
                
            </div>
        )
    }
}