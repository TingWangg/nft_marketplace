import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import { NFTContext } from '../context/NFTContext';
import images from '../assets';
import Button from './Button';

// 菜单项组件，接受是否为移动设备（isMobile）、当前活跃项（active）、设置活跃项（setActive）、设置是否打开菜单（setIsOpen）作为参数
const MenuItems = ({ isMobile, active, setActive, setIsOpen }) => {
  const generateLink = (i) => { // 根据索引生成链接路径的函数
    switch (i) {
      case 0: return '/';
      case 1: return '/listed-nfts';
      case 2: return '/my-nfts';
      default: return '/';
    }
  };
  return (
    <ul className={`list-none flexCenter flex-row ${isMobile && 'flex-col h-full'}`}>
      {/* 遍历菜单项数组，创建每个菜单项 */}
      {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, i) => (
        <li
          key={i}
          onClick={() => {
            setActive(item); // 设置当前活跃项

            if (isMobile) setIsOpen(false); // 如果是移动设备，关闭菜单
          }}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 
          ${active === item
            ? 'dark:text-white text-nft-black-1'
            : 'dark:text-nft-gray-3 text-nft-gray-2'}
            `}
        >
          <Link href={generateLink(i)}>{item}</Link> {/* 使用Link组件包裹菜单项 */}
        </li>
      ))}
    </ul>
  );
};

// 按钮组件组件，接受设置活跃项（setActive）、路由对象（router）、设置是否打开菜单（setIsOpen）作为参数
const ButtonGroup = ({ setActive, router, setIsOpen }) => {
  const { connectWallet, currentAccount } = useContext(NFTContext); // 使用NFT上下文获取连接钱包函数及当前账户状态
  return currentAccount ? ( // 如果存在当前账户，则显示创建按钮
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive(''); // 设置活跃项为空
        setIsOpen(false); // 关闭菜单

        router.push('/create-nft'); // 跳转到创建NFT页面
      }}
    />
  ) : ( // 如果不存在当前账户，则显示连接按钮
    <Button
      btnName="Connect"
      classStyles="mx-2 rounded-xl"
      handleClick={connectWallet} // 点击按钮时执行连接钱包函数
    />
  );
};

// 检查当前活跃项函数，根据路由路径设置活跃项
const checkActive = (active, setActive, router) => {
  switch (router.pathname) {
    case '/':
      if (active !== 'Explore NFTs') setActive('Explore NFTs');
      break;
    case '/listed-nfts':
      if (active !== 'Listed NFTs') setActive('Listed NFTs');
      break;
    case '/my-nfts':
      if (active !== 'My NFTs') setActive('My NFTs');
      break;
    case '/create-nft':
      setActive('');
      break;
    default:
      setActive('');
  }
};

// 导航栏组件
const Navbar = () => {
  const { theme, setTheme } = useTheme(); // 获取当前主题及主题切换函数
  const router = useRouter();
  const [active, setActive] = useState('Explore NFTs'); // 定义活跃项状态，默认为'Explore NFTs'
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTheme('dark'); // 组件挂载时设置主题为暗色模式
  }, []);

  useEffect(() => {
    checkActive(active, setActive, router); // 监听路由变化，更新活跃项状态
  }, [router.pathname]);

  return (
    <nav className="flexBetween w-full fixed z_10 p_4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          {/* Logo区域，点击时设置活跃项为'Explore NFTs' */}
          <div
            className="flexCenter md:hidden cursor-pointer"
            onClick={() => {
              setActive('Explore NFTs');
            }}
          >
            <Image src={images.logo02} objectFit="contain" width={32} height={32} alt="logo" />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">CryptoKet</p>
          </div>
        </Link>
        <Link href="/">
          {/* 大屏幕Logo区域，点击时设置活跃项为'Explore NFTs'并关闭菜单 */}
          <div
            className="hidden md:flex"
            onClick={() => {
              setActive('Explore NFTs');
              setIsOpen(false);
            }}
          >
            <Image src={images.logo02} objectFit="contain" width={32} height={32} alt="logo" />
          </div>
        </Link>
      </div>
      {/* 主题切换按钮 */}
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <input type="checkbox" className="checkbox" id="checkbox" onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
          <label htmlFor="checkbox" className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label">
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>
        {/* 移动设备菜单按钮 */}
        <div className="md:hidden flex">
          {/* 菜单项 */}
          <MenuItems active={active} setActive={setActive} />
          <div className="ml-4">
            {/* 按钮组 */}
            <ButtonGroup setActive={setActive} router={router} setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>

      <div className="hidden md:flex ml-2">
        {/* 展开/折叠菜单按钮 */}
        {isOpen
          ? (
            <Image
              src={images.cross}
              objectFit="contain"
              width={20}
              height={20}
              alt="menu"
              onClick={() => setIsOpen(false)}
              className={theme === 'light' ? 'filter invert' : ''}
            />
          ) : (
            <Image
              src={images.menu}
              objectFit="contain"
              width={25}
              height={25}
              alt="menu"
              onClick={() => setIsOpen(true)}
              className={theme === 'light' ? 'filter invert' : ''}
            />
          )}

        {/* 展开的菜单项 */}
        {isOpen && (
        <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col ">
          <div className="flex-1 p-4">
            {/* 移动设备菜单项 */}
            <MenuItems active={active} setActive={setActive} isMobile setIsOpen={setIsOpen} />
          </div>
          <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
            {/* 移动设备按钮组 */}
            <ButtonGroup setActive={setActive} router={router} />
          </div>
        </div>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
