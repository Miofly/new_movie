import ajax from './ajax'
import axios from 'axios'

const instanceOne = axios.create()
instanceOne.defaults.baseURL = 'http://t4o346yasw.weixin.vsysf.com/xx3-88/gudong/api/' // 实例的baseurl
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
