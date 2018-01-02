import fetch from '../../utils/fetch';

export function faceMerge(id, serverId) {
    return fetch
        .post(process.env.BASE_API + "/face/template/" + id + "/merge", { sid: serverId })
}


export function getTemplats() {
    return fetch
        .get(process.env.BASE_API + "/face/template")
}