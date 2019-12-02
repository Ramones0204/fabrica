//export const baseApiUrl = 'http://192.168.107.127:3000'
import Vue from 'vue'
//export const baseApiUrl = 'https://localhost:3000'
export const userKey = "__knowledge_user"
export const baseApiUrl = 'http:// 192.168.107.127:3000'

export function showError(e){
    if(e && e.response && e.response.data){
        Vue.toasted.global.defaultError({msg:e.response.data})
    } else if(typeof e ==='string'){
        Vue.toasted.global.defaultError({msg:e})
    } else{
        Vue.toasted.global.defaultError()
    }
}

export default  {baseApiUrl,showError,userKey}