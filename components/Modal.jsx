import { useRef } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import images from '../assets';

// 购买NFT时的模态框组件，接受标题（header）、主体内容（body）、页脚（footer）、关闭回调（handleClose）
const Modal = ({ header, body, footer, handleClose }) => {
  const modalRef = useRef(null); // 创建一个ref用于模态框的DOM元素引用
  const { theme } = useTheme(); // 获取当前主题

  // 点击模态框外部时关闭模态框的处理函数
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  return (
    <div className="flexCenter fixed insert-0 z-10 animated fadeIn" onClick={handleClickOutside}>
      <div ref={modalRef} className="md:w-11/12 minlg:w-2/4 dark:bg-nft-dark bg-white flex flex-col rounded-lg">
        {/* 关闭按钮 */}
        <div className="flex justify-end mt-4 mr-4 minlg:mt-6 minlg:mr-6">
          <div className="relative w-3 h-3 minlg:w-6 minlg:h-6 cursor-pointer" onClick={handleClose}>
            <Image src={images.cross} layout="fill" className={theme === 'light' ? 'filter invert' : ''} />
          </div>
        </div>
        {/* 标题 */}
        <div className="flexCenter w-full text-center p-4">
          <h2 className="font-poppins dark:text-white text-nft-black-1 font-normal text-2xl">{header}</h2>
        </div>
        {/* 主体内容 */}
        <div className="p-10 sm:px-4 border-t border-b dark:border-nft-black-3 border-nft-gray-1">
          {body}
        </div>
        {/* 页脚 */}
        <div className="flexCenter p-4">
          {footer}
        </div>
      </div>
    </div>
  );
};

export default Modal;
