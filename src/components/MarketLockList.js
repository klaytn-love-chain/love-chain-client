import React from "react";
import Image from "next/image";
import styles from "./MarketLockList.module.scss";
import Link from "next/link";

function MarketLockList({ lockList }) {
  const formatFeature = (boolean) => boolean ? 'O' : 'X';

  return (
		<div className={styles.container}>
			<ul className={styles.list}>
      {lockList.map((item, index) => {
        return (
          <li key={index} className={styles.item}>
            <Link href={`/item/${item.tokenId}`}>
              <a>
                <div className={styles.box}>
                  <div className={styles.main}>
                    <Image
                      src={item.lockImage}
                      alt={`No.${item.tokenId}`}
                      width={300}
                      height={300}
                      quality={100}
                    />
                    <span className={styles.number}> No. {item.tokenId} </span>
                    <span className={styles.price}> {item.price} Klay </span>
                    {item.isAvailable && <div className={styles.sell}>구매<br/>가능</div>}
                  </div>
                  <div className={styles.detail}>
                    <div> 만난날짜 : {formatFeature(item.feature.date)} </div>
                    <div> 커플사진 : {formatFeature(item.feature.coupleImage)} </div>
                    <div> 한줄문장 : {formatFeature(item.feature.oneLine)} </div>
                    <div> 소셜프로필 : {formatFeature(item.feature.socialProfile)} </div>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        );
      })}
			</ul>
    </div>
  );
}

export default MarketLockList;
