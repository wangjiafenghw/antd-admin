import React, { PureComponent } from "react"
import MarkDown from "react-markdown"
import { Control, Editor } from "./components/index"
import { Page } from "components"

export default class App extends PureComponent{
    render(){
        return(
            <Page>
                <Control />
                <Editor />
            </Page>
        )
    }
}