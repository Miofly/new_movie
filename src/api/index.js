import ajax from './ajax'
import axios from 'axios'

const instanceOne = axios.create()
instanceOne.defaults.baseURL = 'http://123.0t038.cn/jin-61/0509gkl/515love/api/' // 实例的baseurl
instanceOne.defaults.withCredentials = false // 实例的baseurl

const publicGet = (url) => ajax({
    sourceAxios: instanceOne,
    url: url,
    getHeader: {
        'Content-Type': 'json'
    }
})

export {
    publicGet,
}
