import React, { PureComponent } from 'react'
import ReactAce from 'react-ace-editor';


export default class Editor extends PureComponent{
    constructor() {
        super()
        this.onChange = this.onChange.bind(this);
        this.state = {
            editorHeiget: 620
        }
    }
    onChange(newValue, e) {
        // console.log(newValue, e);
        
        const editor = this.ace.editor; // The editor object is from Ace's API
        // console.log(editor.getValue()); // Outputs the value of the editor
        this.props.onChange(editor.getValue())
    }
    render(){
        console.log(this.props.onChange)
        return(
            <ReactAce
                mode="markdown"
                theme="tomorrow_night_eighties"
                setReadOnly={false}
                onChange={this.onChange}
                style={{ minHeight: this.state.editorHeiget+"px", fontSize: "16px" }}
                ref={instance => { this.ace = instance; }} // Let's put things into scope
            />
        )
    }
}