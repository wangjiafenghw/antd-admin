import React, { PureComponent } from 'react'
import { Form, Input, Button, Row, Col, Avatar, Radio } from 'antd';
const { TextArea } = Input;
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'

import styles from './index.less'

const FormItem = Form.Item;

@withI18n()
@connect(({ app }) => ({
  avatar: app.user.avatar,
  nickname: app.user.nickname,
}))

@Form.create()

export default class Commit extends PureComponent{
    constructor(props){
        super(props)
    }
    handleOk = () => {
        console.log(this.props)
        const { dispatch, form } = this.props
        const { validateFieldsAndScroll } = form
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            dispatch({ type: 'upload/uploadCommit', payload: values })
        })
    }
    render(){
        const { loading, form, i18n, avatar } = this.props
        const { getFieldDecorator } = form
        return(
            <Row className={styles.marginTop50}>
              <Col span={1}>
                <Avatar shape="square" size="large" icon="user" src={avatar} />
              </Col>
              <Col span={23} className={styles.border}>
                <h3>Commit</h3>
                <Form
                  className = {styles.form}
                >
                    <FormItem>
                        {getFieldDecorator('type', {
                            initialValue: "0",
                        })(
                        <Radio.Group buttonStyle="solid">
                        <Radio.Button value="0">公开</Radio.Button>
                        <Radio.Button value="1">私有</Radio.Button>
                        <Radio.Button value="2">限制</Radio.Button>
                        </Radio.Group>
                        )}
                    
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('filename', {
                            initialValue: "",
                        })(
                            <Input className={styles.filename} placeholder="文件名" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('desc', {
                            initialValue: "",
                        })(
                            <TextArea rows={4} placeholder="简介。。。" />
                        )}
                    </FormItem>
                    <Row>
                        <Button
                            type="primary"
                            onClick={this.handleOk}
                        >
                            <Trans>提交</Trans>
                        </Button>
                    </Row>
                </Form>
                
              </Col>
            </Row>
        )
    }
}