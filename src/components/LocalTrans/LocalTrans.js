import { getLocale } from 'utils'
export function Timer(props){
    return new Date(props.children).toLocaleString(getLocale())
}
export function Common(props){
    return props.children.toLocaleString(getLocale())
}

//现实不同地域内容显示

///实现国际化，


 