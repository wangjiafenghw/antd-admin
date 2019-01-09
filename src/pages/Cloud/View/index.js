import React, { PureComponent } from 'react'
import { Page } from 'components';
import Fv from './components/index'

import { connect } from 'dva'
import { withI18n } from '@lingui/react'

const data = [
    {
        name: "root",
        url: "http://localhost:1234/cloud/common/",
        visit: false,
        isDir: true
    },
    {
        name: "文件夹2",
        url: "http://localhost:1234/cloud/common/",
        visit: true,
        isDir: true
    },
    {
        name: "文件夹3",
        url: "http://localhost:1234/cloud/common/",
        visit: true,
        isDir: true
    },
    {
        name: "adminMongo-master.zip",
        url: "http://localhost:1234/cloud/common/4316c99d200be.png",
        visit: true,
        isDir: false
    },
    {
        name: "2018080111270558.jpeg",
        url: "http://localhost:1234/cloud/common/c409888b0eb71.jpeg",
        visit: false,
        isDir: false
    },
    {
        name: "2018-11-01 15-17-00 的屏幕截图.png",
        url: "http://localhost:1234/cloud/common/e9f5e41e2bca5.png",
        visit: false,
        isDir: false
    },
    {
        name: "adminMongo-master.zip",
        url: "http://localhost:1234/cloud/common/4316c99d200be.png",
        visit: false,
        isDir: false
    },
    {
        name: "2018080111270558.jpeg",
        url: "http://localhost:1234/cloud/common/c409888b0eb71.jpeg",
        visit: true,
        isDir: false
    },
    {
        name: "2018-11-01 15-17-00 的屏幕截图.png",
        url: "http://localhost:1234/cloud/common/e9f5e41e2bca5.png",
        visit: true,
        isDir: false
    },
    {
        name: "adminMongo-master.zip",
        url: "http://localhost:1234/cloud/common/4316c99d200be.png",
        visit: true,
        isDir: false
    },
    {
        name: "2018080111270558.jpeg",
        url: "http://localhost:1234/cloud/common/c409888b0eb71.jpeg",
        visit: true,
        isDir: false
    },
    {
        name: "2018-11-01 15-17-00 的屏幕截图.png",
        url: "http://localhost:1234/cloud/common/e9f5e41e2bca5.png",
        visit: true,
        isDir: false
    },
    {
        name: "adminMongo-master.zip",
        url: "http://localhost:1234/cloud/common/4316c99d200be.png",
        visit: true,
        isDir: false
    },
    {
        name: "2018080111270558.jpeg",
        url: "http://localhost:1234/cloud/common/c409888b0eb71.jpeg",
        visit: true,
        isDir: false
    },
    {
        name: "2018-11-01 15-17-00 的屏幕截图.png",
        url: "http://localhost:1234/cloud/common/e9f5e41e2bca5.png",
        visit: true,
        isDir: false
    },
    {
        name: "adminMongo-master.zip",
        url: "http://localhost:1234/cloud/common/4316c99d200be.png",
        visit: true,
        isDir: false
    },
    {
        name: "2018080111270558.jpeg",
        url: "http://localhost:1234/cloud/common/c409888b0eb71.jpeg",
        visit: true,
        isDir: false
    },
    {
        name: "2018-11-01 15-17-00 的屏幕截图.png",
        url: "http://localhost:1234/cloud/common/e9f5e41e2bca5.png",
        visit: true,
        isDir: false
    },
    
]

@withI18n()
@connect(({app})=>({
    _id: app.user._id,
}))
export default class View extends PureComponent {
    render(){
        return (
            <Page style={{backgroundColor: "#f2f1f0"}}>
                <Fv dataSource={ data } />
            </Page>
        )
    }
}