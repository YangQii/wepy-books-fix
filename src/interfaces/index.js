import wepy from 'wepy'
import { api } from '../config'
import store from '../utils/storage'
const interfaces = {
    async getUserInfo() {
        console.log('执行getUserInfo');

        const loginData = await wepy.login()
        console.log('登录成功1', loginData)
        const userinfo = await wepy.getUserInfo()
        console.log('获取信息成功2', userinfo)
        userinfo.code = loginData.code
        return userinfo
    },
    async login() {
        console.log('执行login');

        let userinfoRaw = {}
        let userinfo = {}

        try {
            userinfoRaw = await interfaces.getUserInfo()
            userinfo = await wepy.request({
                url: api.user.login.url + userinfoRaw.code,
                method: api.user.login.method,
                dataType: 'json',
                data: {}
            })
            await store.setStorage({
                'userId': userinfo.data.user.id,
                'userInfo': userinfoRaw.userInfo

            })
            console.log('用户信息已存储')
        } catch (e) {
            console.log(e)
            if (e.errMsg === 'getUserInfo:fail auth deny') {
                wepy.showModal({
                    title: '提示',
                    content: `由于您刚才拒绝了授权登录,由于微信的特殊性,请重新下载小程序并允许授权(*^__^*) .`
                })
            }
        }
    },
    async login1() {
        console.log('执行login1');
        try {
            const loginData = await wepy.login()
            console.log('longin1',loginData)
            let userinfo = await wepy.request({
                url: api.user.login.url + loginData.code,
                method: api.user.login.method,
                dataType: 'json',
                data: {}
            })
            console.log('出自src/interface文件', userinfo.data)
            await store.setStorage({
                'userId': userinfo.data.user.id,
            })
        } catch (error) {
            console.log('登录失败')
        }

    }
}

export default interfaces
