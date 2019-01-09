import React, { PureComponent } from "react"
import Markdown from "react-markdown"
import { Row, Col } from "antd"
import styles from "./Editor.less"
import L from "../../components/Editor"

export default class Editor extends PureComponent{
    constructor(){
        super()
        this.textarea = React.createRef();
        this.state = {
            input: `
afsdffasdfsad
fadfadsfdsaf
# fdsafdasfdasffdsfsda

fgdjgkfsdjg

## fgdsgjkld
ajgkajgk
---------------
fjkldsaj
===========
1. 3rgfsdgfd
2. fdsgadfg
* jhgkdfjgl
* jgklsdfjk
            `
        }
    }

    handleTextareaChange = (e) => {
        this.setState({input: e.target.value})
        console.log(e.target.value)
    }
    onChange(newValue) {
        this.setState({input: newValue})
    }
    componentDidMount(){
        // this.textarea.current.value = this.state.input
    }
    render(){
        const { state, props } = this
        const { input } = state
        return(
            <Row>
                <Col span={12}>
                    <div className={styles.textarea}>
                        <L onChange = {this.onChange.bind(this)} />
                    </div>
                </Col>
                <Col span={12}>
                    <Markdown className={styles.Markdown} source={input} />
                </Col>
            </Row>
            
        )
    }
}