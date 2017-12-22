import Mock from 'mockjs'
import scoreAPI from './score'
import homeAPI from './home'

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


    Mock.mock(/\/swiper/, 'get', homeAPI.getSwipers)
    Mock.mock(/\/wechat\/redirect/, 'post', homeAPI.getWechatRedirectUrl)

}

export default Mock
