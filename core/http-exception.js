/*
 * @Description: Http错误管理
 * @Author: Jamboy
 * @Date: 2021-02-23 15:41:39
 * @LastEditTime: 2021-02-23 15:48:13
 */

class HttpException extends Error {
    errorCode = 9999;
    statusCode = 500;
    message = '';

    constructor(errorCode, message, statusCode) {
        super();
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.message = message;

    }
}
export {
    HttpException
}
