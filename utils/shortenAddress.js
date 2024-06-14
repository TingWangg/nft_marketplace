/**
 * 将以太坊地址缩短为形如 "0x1234...5678" 的格式。
 * @param {string} address 要缩短的以太坊地址
 * @returns {string} 缩短后的地址格式
 */
export const shortenAddress = (address) => (
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`
);
