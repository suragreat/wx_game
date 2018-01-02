import Mock from 'mockjs'

export default {
    jsConfig: (id) => {
        console.log("jsConfig");
        console.log(id);
        return Mock.mock({
            "data":
                {
                    appId: "wx700ea0db4d682e72",
                    nonceStr: "BOm5Lb1GNVYcNAkt",
                    timestamp: 1514164791,
                    url: "http://101.132.148.33/", 
                    signature: "d6b7e5cafed7a95e49b8b48be5282041b6d7cb33"
                }, "status": 200
        })
    },
}