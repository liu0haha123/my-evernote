import axios from "axios"
// 配置通用参数
axios.defaults.headers.post["Content-Type"] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = process.env.VUE_APP_BASEURL
axios.defaults.withCredentials = true
export default function request (url, type = "GET", data = {}) {
    return new Promise((resolve, reject) => {
        let option = {
            url,
            method: type,
            ValidateStatus: function (status) {
                return (status >= 200 && status < 300) || status === 400
            }
        }
        if (type.toLowerCase() === "get") {
            option.params = data
        } else {
            option.data = data
        }
        axios(option).then(res => {
            if (res.status === 200) {
                resolve(res.data)
            } else {
                console.error(res.data)
                reject(res.data)
            }
        }).catch(err => {
            reject({ msg: err.response.data.msg })
        })
    })
}