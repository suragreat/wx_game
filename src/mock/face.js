import Mock from 'mockjs'

export default {
    getTemplats: (id) => {
        console.log("getTemplats");
        console.log(id);
        return Mock.mock({
            "data":
                [{ key: '1', value: '奇迹', url: "https://yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/1.png" },
                { key: '3', value: '范蠡', url: 'https://yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/3.png' },
                { key: '5', value: '孙尚香', url: 'https://yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/5.png' },
                ], "status": 200
        })
    },
    faceMerge: (id) => {
        console.log("faceMerge");
        console.log(id);
        return Mock.mock({
            "data": "https://yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/1.png", "status": 200
        })
    }
}