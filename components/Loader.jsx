import Image from 'next/image';

import images from '../assets';

// 加载器组件，用于显示加载动画圈圈
const Loader = () => (
  <div className="flexCenter w-full my-4">
    <Image src={images.loader} alt="loader" width={100} objectFit="contain" />

  </div>
);

export default Loader;
