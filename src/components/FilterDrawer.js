import React, { useCallback } from "react";
import styles from "./FilterDrawer.module.scss";
import {
  Button,
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
	DrawerCloseButton,
	Tag, TagLabel,
} from "@chakra-ui/react";

function FilterDrawer({
	totalLock,
  priceFilter,
  setPriceOrderFilter,
  dateFilter,
  setDateFilter,
  coupleImageFilter,
  setCoupleImageFilter,
  oneLineFilter,
  setOneLineFilter,
  socialProfileFilter,
  setSocialProfileFilter,
  isAvailableFilter,
  setIsAvailableFilter,
  isDrawerOpen,
  onDrawerClose,
}) {

  const handleReset = useCallback(() => {
    setPriceOrderFilter('desc');
    setDateFilter(null);
    setCoupleImageFilter(null);
    setOneLineFilter(null);
    setSocialProfileFilter(null);
    setIsAvailableFilter(null);
  }, [
    setCoupleImageFilter,
    setDateFilter,
    setIsAvailableFilter,
    setOneLineFilter,
    setPriceOrderFilter,
    setSocialProfileFilter
  ]);

  return (
    <>
      <Drawer
        size="sm"
        placement="right"
        isOpen={isDrawerOpen}
        onClose={onDrawerClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton style={{ background: "#7c33e7", color: "white" }} />

          <DrawerHeader>정렬</DrawerHeader>
          <div className={styles.section}>
						<Tag
							size='lg'
							borderRadius='full'
              variant={priceFilter === 'desc' ? "solid" : "outline"}
              colorScheme='purple'
              cursor="pointer"
              onClick={() => setPriceOrderFilter('desc')}
						>
							<TagLabel>가격 내림차순</TagLabel>
            </Tag>
            <Tag
              size='lg'
              borderRadius='full'
              variant={priceFilter === 'asc' ? "solid" : "outline"}
              colorScheme='purple'
              cursor="pointer"
              onClick={() => setPriceOrderFilter('asc')}
						>
							<TagLabel>가격 오름차순</TagLabel>
						</Tag>
					</div>

          <DrawerHeader>옵션 선택</DrawerHeader>
          <div className={styles.section}>
						<Tag
							size='lg'
							borderRadius='full'
              variant={dateFilter ? "solid" : "outline"}
              colorScheme='purple'
              cursor="pointer"
              onClick={() => setDateFilter(!dateFilter)}
						>
							<TagLabel>만난날짜 등록가능</TagLabel>
            </Tag>
            <Tag
							size='lg'
							borderRadius='full'
              variant={coupleImageFilter ? "solid" : "outline"}
              colorScheme='purple'
              cursor="pointer"
              onClick={() => setCoupleImageFilter(!coupleImageFilter)}
						>
							<TagLabel>커플사진 등록가능</TagLabel>
            </Tag>
            <Tag
							size='lg'
							borderRadius='full'
              variant={oneLineFilter ? "solid" : "outline"}
              colorScheme='purple'
              cursor="pointer"
              onClick={() => setOneLineFilter(!oneLineFilter)}
						>
							<TagLabel>한줄문장 등록가능</TagLabel>
            </Tag>
            <Tag
							size='lg'
							borderRadius='full'
              variant={socialProfileFilter ? "solid" : "outline"}
              colorScheme='purple'
              cursor="pointer"
              onClick={() => setSocialProfileFilter(!socialProfileFilter)}
						>
							<TagLabel>소셜프로필 등록가능</TagLabel>
            </Tag>
          </div>

          <DrawerHeader>구매가능</DrawerHeader>
          <div className={styles.section}>
						<Tag
							size='lg'
							borderRadius='full'
              variant={isAvailableFilter ? "solid" : "outline"}
              colorScheme='purple'
              cursor="pointer"
              onClick={() => setIsAvailableFilter(isAvailableFilter ? null: true)}
						>
							<TagLabel>구매가능만 보기</TagLabel>
            </Tag>
					</div>

          <DrawerFooter>
            <Button
              mr={5}
              name="reset"
              variant="outline"
              colorScheme="purple"
              onClick={handleReset}
            >
              초기화
            </Button>
            <Button
              variant="outline"
              colorScheme="purple"
              onClick={onDrawerClose}
            >
              {totalLock}개 상품 보기
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default FilterDrawer;
