import fetch from '../../utils/fetch';

export function jsConfig() {
    return fetch
        .post(process.env.BASE_API + "/jsconfig")
}