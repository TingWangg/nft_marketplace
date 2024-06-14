/**
 * 根据传入的 NFT 数组计算创作者的销售总额。
 * @param {Array} nfts 包含 NFT 信息的数组
 * @returns {Array} 返回包含创作者及其销售总额的数组
 */
export const getCreators = (nfts) => {
  const creators = nfts.reduce((creatorObject, nft) => {
    (creatorObject[nft.seller] = creatorObject[nft.seller] || []).push(nft);

    return creatorObject;
  }, []);

  return Object.entries(creators).map((creator) => {
    const seller = creator[0];
    const sum = creator[1].map((item) => Number(item.price)).reduce((prev, curr) => prev + curr, 0);

    return ({ seller, sum });
  });
};
