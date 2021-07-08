// import {CryptoJS} from '../miniprogram_npm/crypto-js/index.js'
// import { Cyrpto } from '../node_modules/crypto-js/crypto-js';
// import { Crypto } from "../miniprogram_npm/crypto-js/index.js";
const CryptoJs = require('crypto-js');
const defaultKey = "BB6PPdAWcDbyrqF5";


/**
 * 解密隐私数据，获取手机号
 * @param {*} encryptData 返回的加密数据
 * @param {*} iv 解密初向量
 */
function decryptWxBizData(encryptedData, iv) {
    // base64 decode ：使用 CryptoJS 中 Crypto.util.base64ToBytes()进行 base64解码
    //base64解码
    console.log("未解码")
    console.log(encryptedData)
    var encryptedData = CryptoJs.enc.Base64.stringify(encryptedData);
    console.log("base64解码")
    console.log(encryptedData)

}

/**
 * 解密AES
 * 加密模式:ECB
 * 
 * 密钥：BB6PPdAWcDbyrqF5
 * @param {待解密base64} str 
 */
function decrypt(parm) {
    const keyStr = encKey(defaultKey);   // key转utf8格式
    const encryptedStr = CryptoJs.AES.decrypt(parm, keyStr, {
        // iv: key,
        mode: CryptoJs.mode.ECB, //加密模式
        padding: CryptoJs.pad.Pkcs7 //填充
    });
    return encryptedStr.toString(CryptoJs.enc.Utf8); //返回解密utf8
}

/**
 * 加密 ECB 
 * @param {*} parm 
 */
function encrypt(parm) {
    const keyStr = encKey(defaultKey);
    const encryptedStr = CryptoJs.AES.encrypt(parm, keyStr, {
        // iv: "",
        mode: CryptoJs.mode.ECB, //加密模式
        padding: CryptoJs.pad.Pkcs7
    })
    // return CryptoJs.enc.Base64.stringify(encryptedStr.ciphertext)
    // 输出Base64
    return encryptedStr.toString();
}

/**
 * 使用md hash字符串
 * @param {需加密字符串} str 
 */
function md5(str) {
    return CryptoJs.MD5(str).toString();
}

/**
 * 密钥转utf8
 * @param key 需要转格式的字符
 */
function encKey(key) {
    return CryptoJs.enc.Utf8.parse(defaultKey);
}

export default {
    decrypt,
    encrypt,
    md5
}