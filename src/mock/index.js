import Mock from 'mockjs'
import scoreAPI from './score'
import homeAPI from './home'
import faceAPI from './face'
import sdkAPI from './js-sdk'

if (process.env.NODE_ENV === 'development1') {
    Mock.mock(/\/game\/.*\/score\/undo/, 'post', scoreAPI.undoScore)
    Mock.mock(/\/game\/.*\/score/, 'post', scoreAPI.createScore)
    Mock.mock(/\/game\/.*\/score/, 'get', scoreAPI.getScores)
    Mock.mock(/\/game\/.*\/player/, 'get', scoreAPI.getPlayers)
    Mock.mock(/\/game\/.*\/join/, 'post', scoreAPI.joinGame)
    Mock.mock(/\/game\/.*\/quit/, 'post', scoreAPI.quitGame)
    Mock.mock(/\/game\/.*\/close/, 'post', scoreAPI.closeGame)
    Mock.mock(/\/game/, 'post', scoreAPI.createGame)
    Mock.mock(/\/game/, 'get', scoreAPI.getGames)

    Mock.mock(/\/face\/template/, 'get', faceAPI.getTemplats)
    Mock.mock(/\/face\/.*\/template/, 'post', faceAPI.faceMerge)
    

    Mock.mock(/\/swiper/, 'get', homeAPI.getSwipers)
    Mock.mock(/\/wechat\/redirect/, 'post', homeAPI.getWechatRedirectUrl)


    Mock.mock(/\/jsconfig/, 'post', sdkAPI.jsConfig)

}

export default Mock
