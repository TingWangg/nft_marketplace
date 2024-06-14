// 引入 Node.js 的文件系统模块
const fs = require('fs');

// 引入 Hardhat 的 Waffle 扩展
require('@nomiclabs/hardhat-waffle');

// 读取并解析私钥文件内容
const privateKey = fs.readFileSync('.secret').toString().trim();

module.exports = {
  // Hardhat 配置文件的网络配置部分
  network: {
    hardhat: {
      chainId: 31337, // Hardhat 网络的链 ID
    },
  },
  solidity: '0.8.4', // Solidity 编译器版本
};
