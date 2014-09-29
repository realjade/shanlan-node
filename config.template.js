/**
 * @name zhangyy-g@grandsoft.com.cn
 * @description zhangyy's code
 * Date: 2014/9/11
 * Time: 21:44
 *
 */
var config = {
    env: 'development',
    javaServer: '182.92.159.195',
    javaPort: '8080',
    //javaPort: '443', //https

    redis: {
        host: "182.92.159.195",
        pass: 'shanlan-redis',
        port: 6379,
        db: "0",
        prefix: "user-"
    }
};

module.exports = config