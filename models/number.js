/*
 * @Description: 
 * @Author: Jamboy
 * @Date: 2021-07-12 15:44:28
 * @LastEditTime: 2021-07-12 16:18:22
 */
/**
 * 精确相加
 * @param num1 1.1
 * @param num2 1.22
 * @returns {number}
 */
function accAdd(num1, num2) {
  const num1Digits = (num1.toString().split('.')[1] || '').length //取出小数位长度 1
  const num2Digits = (num2.toString().split('.')[1] || '').length //取出小数位长度 2
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits)) //最大小数位长度的10次方 1024
  // const baseNum = Math.pow(10, 2)

  return (Math.round(num1 * baseNum) + Math.round(num2 * baseNum)) / baseNum
}

/**
 * 精确相乘
 * @param num1
 * @param num2
 * @returns {number}
 */
function accMultiply(num1, num2) {
  const num1Digits = (num1.toString().split('.')[1] || '').length
  const num2Digits = (num2.toString().split('.')[1] || '').length
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits))
  // const baseNum = Math.pow(10, 2)
  return (
    (Math.round(num1 * baseNum) * Math.round(num2 * baseNum)) /
    baseNum /
    baseNum
  )
}

/**
 * 精确相减
 * @param num1
 * @param num2
 * @returns {number}
 */
function accSubtract(num1, num2) {
  const num1Digits = (num1.toString().split('.')[1] || '').length
  const num2Digits = (num2.toString().split('.')[1] || '').length
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits))
  return (Math.round(num1 * baseNum) - Math.round(num2 * baseNum)) / baseNum
}

export { accAdd, accMultiply, accSubtract }

