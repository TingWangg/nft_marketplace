import React, { useContext } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { NFTContext } from '../context/NFTContext';
import images from '../assets';
import { shortenAddress } from '../utils/shortenAddress';

// NFT卡片组件，接受NFT对象（nft）和是否在个人资料页面（onProfilePage）作为参数
const NFTCard = ({ nft, onProfilePage }) => {
  const { nftCurrency } = useContext(NFTContext); // 使用NFT上下文获取NFT货币信息

  return (
    // 通过Link组件实现了点击卡片跳转到NFT详情页面的功能
    <Link href={{
      pathname: '/nft-details',
      query: {
        image: nft.image,
        tokenId: nft.tokenId,
        tokenURI: nft.tokenURI,
        name: nft.name,
        owner: nft.owner,
        price: nft.price,
        seller: nft.seller,
        description: nft.description,
      },
    }}
    >
      {/* NFT卡片容器 */}
      <div className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md">
        {/* NFT图像容器 */}
        <div className="relative w-full h-52 sm:h-36 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
          <Image src={nft.image || images[`nft${nft.i}`]} layout="fill" objectFit="cover" alt={`nft${nft.i}`} />
        </div>
        {/* NFT信息区域 */}
        <div className="mt-3 flex flex-col">
          {/* NFT名称 */}
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">{nft.name}</p>
          {/* NFT价格和所有者信息 */}
          <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
            {/* NFT价格 */}
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">{nft.price} <span className="normal">{nftCurrency}</span></p>
            {/* NFT所有者地址 */}
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">{shortenAddress(onProfilePage ? nft.seller : nft.seller)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
