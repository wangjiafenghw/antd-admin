import React, { PureComponent } from 'react'
import File from './File'
import Folder from './Folder'
import { withI18n } from '@lingui/react'
import { connect } from 'dva'



import styles from './index.less'

// import {ContextMenu} from "../../components/index"
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
const MENU_TYPE = 'MULTI';
function collect(props) {
    return { name: props.name };
}
@withI18n()
@connect()
export default class App extends PureComponent{
    constructor(){
        super()
        this.state = {
            displayContextMenu: false,
            ctxM: ''
        }
    }


    componentWillMount(){
        this.setState({ ContextMenu: true })
    }
    render(){
        const data = this.props.dataSource
        let arr = [];
        for(let i=0;i<data.length;i++){
            let item = data[i]
            if(item.isDir){
                arr.push(
                    <div className={styles.inline}>
                        <ContextMenuTrigger
                                id={MENU_TYPE} name={item.name}
                                holdToDisplay={1000}
                                collect={collect}>
                            <Folder data={item} />
                        </ContextMenuTrigger>

                        <ContextMenu className={styles.reactcontextmenu} id={MENU_TYPE}>
                            <MenuItem className={styles.reactcontextmenuitem} onClick={this.handleClick} data={{ action: 'Added' }}>Add 1 count</MenuItem>
                            <MenuItem className={styles.reactcontextmenuitem} onClick={this.handleClick} data={{ action: 'Removed' }}>Remove 1 count</MenuItem>
                        </ContextMenu>
                    </div>
                        
                )
            }else{
                arr.push(
                    <div className={styles.inline}>

                        <ContextMenuTrigger
                                id={MENU_TYPE} name={item.name}
                                holdToDisplay={1000}
                                collect={collect}>
                            <File data={item} />
                        </ContextMenuTrigger>

                        <ContextMenu className={styles.reactcontextmenu} id={MENU_TYPE}>
                            <MenuItem className={styles.reactcontextmenuitem} onClick={this.handleClick} data={{ action: 'Added' }}>Add 1 count</MenuItem>
                            <MenuItem className={styles.reactcontextmenuitem} onClick={this.handleClick} data={{ action: 'Removed' }}>Remove 1 count</MenuItem>
                        </ContextMenu>

                    </div>
                        
                )
            }
        }
        return (
            <div>
                { arr }
            </div>
        )
    }
}
