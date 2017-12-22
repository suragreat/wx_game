import Mock from 'mockjs'

var Random = Mock.Random

var scores = Mock.mock({
    "data": {
        "name": [Random.cname(), Random.cname(), Random.cname(), Random.cname(), Random.cname(), Random.cname(), Random.cname(), Random.cname()],
        'scores|4': [[Random.integer(1, 10), Random.integer(1, 10), Random.integer(1, 10), Random.integer(1, 10), Random.integer(1, 10), Random.integer(1, 10), Random.integer(1, 10), Random.integer(1, 10)]]
    }, "status": 200
})

var games = Mock.mock({
    "data": [
        { "id": "1", "name": "干瞪眼", "type": "1", "winner": Random.cname(), "players": [Random.cname(), Random.cname()], "creator": Random.cname() },
        { "id": "2", "name": "斗地主", "type": "1", "winner": Random.cname(), "players": [Random.cname(), Random.cname()], "creator": Random.cname() }
    ]
    , "status": 200
})

export default {
    getScores: (id) => {
        console.log("getScores");
        console.log(id);
        return Mock.mock({
            "data": {
                "name": [Random.cname(), Random.cname(), Random.cname(), Random.cname(), Random.cname(), Random.cname(), Random.cname(), Random.cname()],
                'scores|4': [[Random.integer(1, 10), Random.integer(1, 10), Random.integer(1, 10), Random.integer(1, 10), Random.integer(1, 10), Random.integer(1, 10), Random.integer(1, 10), Random.integer(1, 10)]]
            }, "status": 200
        })
    },
    getGames: (data) => {
        console.log("getGames");
        console.log(data);
        return games
    },
    getPlayers: (data) => {
        console.log("getPlayers");
        console.log(data);
        return Mock.mock({
            "data": [Random.cname(), Random.cname(), Random.cname(), Random.cname(), Random.cname(), Random.cname(), Random.cname(), Random.cname()]
            , "status": 200
        })
    },
    createScore: (scores) => {
        console.log("createScore");
        console.log(scores);
        return Mock.mock({
            "status": 200, "message": "服务器出错了"
        })
    },
    undoScore: (scores) => {
        console.log("undoScore");
        console.log(scores);
        return Mock.mock({
            "status": 200, "message": "服务器出错了"
        })
    },
    joinGame: (data) => {
        console.log("joinGame");
        console.log(data);
        return Mock.mock({
            "status": 2010, "message": "您已经加入游戏了"
        })
    },
    quitGame: (data) => {
        console.log("quitGame");
        console.log(data);
        return Mock.mock({
            "status": 200, "message": "您不在游戏中"
        })
    },
    closeGame: (data) => {
        console.log("closeGame");
        console.log(data);
        return Mock.mock({
            "status": 200, "message": "游戏已关闭"
        })
    },
    createGame: (game) => {
        console.log("createGame");
        console.log(game);
        return Mock.mock({
            "data": [
                { "id": "1", "name": "干瞪眼", "type": "1", "winner": Random.cname(), "players": [Random.cname(), Random.cname()] },
                { "id": "2", "name": "斗地主", "type": "1", "winner": Random.cname(), "players": [Random.cname(), Random.cname()] },
                { "id": "3", "name": "新开局", "type": "1", "winner": Random.cname(), "players": [Random.cname(), Random.cname()] }
            ]
            , "status": 200
        });
    },
}
