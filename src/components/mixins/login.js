import wepy from 'wepy'
import interfacess from '../../interfaces/index'
export default class login extends wepy.mixin {
    data = {
        userId: ''
    }
    methods = {
        tap() {
            this.mixin = 'mixin文件： data was changed'
            console.log('mixin文件： method tap')
        }
    }
    async getStoreById() {
        console.log('components/inter/login.js文件：进入了')
        try {
            let userId = await wepy.getStorage({
                key: 'userId'
            });
            console.log('mixin文件：', userId);
            this.userId = userId.data
            this.$apply()
        } catch (error) {
            try {
                console.log('login.js文件：catch error')
                await interfacess.login1()
                let userId = await wepy.getStorage({
                    key: 'userId'
                })
                console.log('error之后', userId);
                this.userId = userId.data
                this.$apply()
            } catch (error) {
                console.log(error);
            }

        }

    }

    onLoad() {
        console.log('components/inter/login.js文件：mixin onLoad')
    }
}
