import fetch from '../../utils/fetch';

export function joinGame(gameId, p) {
    return fetch
        .post(process.env.BASE_API + "/game/" + gameId + "/join", { player: p })
}

export function quitGame(gameId, p) {
    return fetch
        .post(process.env.BASE_API + "/game/" + gameId + "/quit", p)
}

export function closeGame(gameId) {
    return fetch
        .post(process.env.BASE_API + "/game/" + gameId + "/close")
}

export function undoScore(gameId) {
    return fetch
        .post(process.env.BASE_API + "/game/" + gameId + "/score/undo")
}

export function score(gameId, s) {
    return fetch
        .post(process.env.BASE_API + "/game/" + gameId + "/score", s)
}

export function getScores(gameId) {
    return fetch
        .get(process.env.BASE_API + "/game/" + gameId + "/score")
}

export function getGames() {
    return fetch
        .get(process.env.BASE_API + "/game")
}

export function createGame(g) {
    return fetch
        .post(process.env.BASE_API + "/game", { name: g })
}

export function getPlayers(gameId) {
    return fetch
        .get(process.env.BASE_API + "/game/" + gameId + "/player")
}