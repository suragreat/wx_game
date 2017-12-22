import Mock from 'mockjs'

export default {
    getSwipers: (id) => {
        console.log("getSwipers");
        console.log(id);
        return Mock.mock({
            "data":
                [{
                    url: { name: 'Game' },
                    img: 'http://happygame.oss-cn-shanghai.aliyuncs.com/happygame/img/20160109143614_msAEK.jpeg',
                    title: '记分琅琊榜'
                }, {
                    url: { name: 'Face' },
                    img: 'http://happygame.oss-cn-shanghai.aliyuncs.com/happygame/img/a9f0d4c8a3a1a4fb35a0674981d5e6ce.jpg',
                    title: 'Face For You'
                }], "status": 200
        })
    },
    getWechatRedirectUrl: (data) => {
        console.log("getWechatRedirectUrl");
        console.log(data);
        var result = {
            "data": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx700ea0db4d682e72&redirect_uri=http%3a%2f%2f101.132.148.33%2fpage%2fgame%2f1%2finvite&response_type=code&scope=snsapi_userinfo&state=QR#wechat_redirect"
            , "status": 200, "message": "出错了"
        }
        console.log(result)
        return result
    }
}