/*
 * @Description: 枚举类
 * @Author: Jamboy
 * @Date: 2021-06-05 11:43:59
 * @LastEditTime: 2021-06-17 16:01:59
 */

/**
 *
 * @type {{SELECTED:选中 string , WAiTING:可选 string, FORBIDDEN:不可选 string}}
 */
const CellStatus = {
  FORBIDDEN: 'forbidden',
  SELECTED: 'selected',
  WAiTING: 'waiting',
}

const SpuListType = {
  THEME: 'theme',
  ROOT_CATALOG: 'root_catalog',
  SUB_CATALOG: 'sub-catalog',
  LATEST: 'latest',
}

const ShoppingWay = {
  CART: 'cart',
  BUY: 'buy',
}

export { CellStatus, SpuListType, ShoppingWay }
