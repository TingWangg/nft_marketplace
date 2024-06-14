// Next.js 配置对象
const nextConfig = {
  reactStrictMode: true, // 启用 React 严格模式
  images: {
    domains: ['ipfs.infura.io', 'localhost', '127.0.0.1'], // 允许加载图像的域名列表
  },
};

module.exports = nextConfig; // 导出 Next.js 配置对象
