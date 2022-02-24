import React from "react";
import { Button, Tag, TagLabel } from "@chakra-ui/react";
import styles from "./FilterPanel.module.scss";

function FilterPanel({
	totalLock,
	priceFilter,
	dateFilter,
	coupleImageFilter,
	oneLineFilter,
	socialProfileFilter,
	isAvailableFilter,
	onDrawerOpen,
}) {
  return (
		<div className={styles.container}>
			<div className={styles.result}>
				<div className={styles.text}>{totalLock}개의 자물쇠가 검색되었습니다.</div>
				<Button colorScheme="purple" onClick={onDrawerOpen}>검색 필터</Button>
			</div>
			<ul className={styles.filters}>
				{
					priceFilter === 'desc' && (
						<li>
							<Tag
								size='lg'
								borderRadius='full'
								variant='solid'
								colorScheme='purple'
							>
								<TagLabel>가격 내림차순</TagLabel>
							</Tag>
						</li>
					)
				}
				{
					priceFilter === 'asc' && (
						<li>
							<Tag
								size='lg'
								borderRadius='full'
								variant='solid'
								colorScheme='purple'
							>
								<TagLabel>가격 오름차순</TagLabel>
							</Tag>
						</li>
					)
				}
				{
					dateFilter && (
						<li>
							<Tag
								size='lg'
								borderRadius='full'
								variant='solid'
								colorScheme='purple'
							>
								<TagLabel>만난날짜</TagLabel>
							</Tag>
						</li>
					)
				}
				{
					coupleImageFilter && (
						<li>
							<Tag
								size='lg'
								borderRadius='full'
								variant='solid'
								colorScheme='purple'
							>
								<TagLabel>커플사진</TagLabel>
							</Tag>
						</li>
					)
				}
				{
					oneLineFilter && (
						<li>
							<Tag
								size='lg'
								borderRadius='full'
								variant='solid'
								colorScheme='purple'
							>
								<TagLabel>한줄문장</TagLabel>
							</Tag>
						</li>
					)
				}
				{
					socialProfileFilter && (
						<li>
							<Tag
								size='lg'
								borderRadius='full'
								variant='solid'
								colorScheme='purple'
							>
								<TagLabel>소셜프로필</TagLabel>
							</Tag>
						</li>
					)
				}
				{
					isAvailableFilter && (
						<li>
							<Tag
								size='lg'
								borderRadius='full'
								variant='solid'
								colorScheme='purple'
							>
								<TagLabel>구매가능</TagLabel>
							</Tag>
						</li>
					)
				}
			</ul>
    </div>
  );
}

export default FilterPanel;
