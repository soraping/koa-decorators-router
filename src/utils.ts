/**
 * 判断是否是数组，如果不是则转成数组
 * @param arr 数组
 * @return array
 */
export const isArray = (arr: any) => {
    return Array.isArray(arr) ? arr : [arr];
}