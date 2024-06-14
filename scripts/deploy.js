const hre = require('hardhat'); // 引入 Hardhat 库

async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory('NFTMarketplace'); // 获取 NFTMarketplace 合约工厂
  const nftMarketplace = await NFTMarketplace.deploy(); // 部署 NFTMarketplace 合约

  await nftMarketplace.deployed(); // 等待合约部署完成

  console.log('NFTMarketplace deployed to:', nftMarketplace.address); // 打印合约部署地址
}

main()
  .then(() => process.exit(0)) // 成功后退出进程
  .catch((error) => {
    console.error(error); // 打印错误信息
    process.exit(1); // 异常退出进程
  });
