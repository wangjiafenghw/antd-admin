import React, { PureComponent } from 'react'

import { Drawer } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { serverUrl, apiPrefix } from '../../../../utils/config'
import copy from 'copy-to-clipboard';
import { Timer as LocalTimer} from "../../../../components/LocalTrans/LocalTrans"
import { Commit } from "../../components/index"

@withI18n()
@connect(() => {
    
})
export default class App extends PureComponent{
    render(){
        const { visible, record, onClose } = this.props;
        return (
            <Drawer
                title="Editor CloudFile"
                placement="bottom"
                height="400"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <Commit record = { record }/>
            </Drawer>
        )
    }
}