/**
 * 生成指定长度的随机字符串ID。
 * @param {number} length 所需的随机字符串长度
 * @returns {string} 生成的随机字符串ID
 */
export const makeId = (length) => {
  let result = '';

  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

// 示例调用
makeId(3); // 示例输出例如：'2x8'
