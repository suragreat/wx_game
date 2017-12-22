import fetch from '../../utils/fetch';

export function getSwipers() {
    return fetch
        .get(process.env.BASE_API + "/swiper")
}

export function getWechatRedirectUrl(data) {
    return fetch
        .post(process.env.BASE_API + "/wechat/redirect", {url: data})
}