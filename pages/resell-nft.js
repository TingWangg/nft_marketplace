import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { NFTContext } from '../context/NFTContext';
import { Loader, Button, Input } from '../components';

// NFT 转售页面组件
const ResellNFT = () => {
  const { createSale, isLoadingNFT } = useContext(NFTContext);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { tokenId, tokenURI } = router.query;
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  // 异步获取 NFT 数据
  const fetchNFT = async () => {
    const { data } = await axios.get(tokenURI); // 发送 GET 请求获取 NFT 数据

    setPrice(data.price); // 设置 NFT 价格
    setImage(data.image); // 设置 NFT 图像 URL
    setIsLoading(false); // 设置加载状态为 false
  };

  useEffect(() => {
    if (tokenURI) fetchNFT(); // 当 tokenURI 存在时，获取 NFT 数据
  }, [tokenURI]);

  // 执行 NFT 转售操作
  const resell = async () => {
    await createSale(tokenURI, price, true, tokenId); // 调用 createSale 方法进行 NFT 转售操作

    router.push('/'); // 跳转到首页
  };

  // 如果正在加载 NFT 数据，显示加载圈圈
  if (isLoadingNFT) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black font-semibold text-2xl">Resell NFT</h1>
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) => setPrice(e.target.value)}
        />
        {image && <img src={image} className="rounded mt-4" width={350} />}
        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="List NFT"
            classStyles="rounded-xl"
            handleClick={resell}
          />
        </div>
      </div>

    </div>
  );
};

export default ResellNFT;
