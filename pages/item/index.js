import React, { useState, useEffect, useRef, useCallback } from 'react';
import Layout from '../../src/components/Layout';
import MarketLockList from '../../src/components/MarketLockList';
import FilterDrawer from '../../src/components/FilterDrawer';
import FilterPanel from '../../src/components/FilterPanel';
import { Spinner, useDisclosure } from '@chakra-ui/react';
import { getItems } from '../../src/constant/api';

export default function ItemListPage() {
  const observer = useRef(null);
  const [loading, setLoading] = useState(false);
  const [lockList, setLockList] = useState([]);
  const [totalLock, setTotalLock] = useState(0);

  const [priceFilter, setPriceOrderFilter] = useState('desc');
  const [dateFilter, setDateFilter] = useState(null);
  const [coupleImageFilter, setCoupleImageFilter] = useState(null);
  const [oneLineFilter, setOneLineFilter] = useState(null);
  const [socialProfileFilter, setSocialProfileFilter] = useState(null);
  const [isAvailableFilter, setIsAvailableFilter] = useState(null);
  const [offsetFilter, setOffsetFilter] = useState(0);
  const [hasMore, setHasMore] = useState(null);

  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();

  const getMoreItems = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        price: priceFilter,
        date: dateFilter,
        coupleImage: coupleImageFilter,
        socialProfile: socialProfileFilter,
        offset: offsetFilter,
        isAvailable: isAvailableFilter,
      };
      const data = await getItems(params);
      console.log('data', data, offsetFilter, observer.current, lockList.length);
      setLockList((prev) => [...prev, ...data.list]);
      setTotalLock(data.total);
      setHasMore(data.total > lockList.length);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [coupleImageFilter, dateFilter, isAvailableFilter, lockList.length, offsetFilter, priceFilter, socialProfileFilter]);

  useEffect(() => {
    offsetFilter != 0 && getMoreItems();
  }, [offsetFilter]);

  useEffect(() => {
    setOffsetFilter(0);
    setLockList([]);
    getMoreItems();
  }, [priceFilter, dateFilter, coupleImageFilter, socialProfileFilter, isAvailableFilter]);

  const endRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasMore) {
            setOffsetFilter((prev) => prev + 12);
          }
        },
        { threshold: 0.1 }
      );
      if (node) observer.current.observe(node);
    },
    [hasMore, loading]
  );

  return (
    <Layout>
      {loading && <Spinner />}
      <>
        <FilterPanel
          totalLock={totalLock}
          priceFilter={priceFilter}
          dateFilter={dateFilter}
          coupleImageFilter={coupleImageFilter}
          oneLineFilter={oneLineFilter}
          socialProfileFilter={socialProfileFilter}
          isAvailableFilter={isAvailableFilter}
          onDrawerOpen={onDrawerOpen}
        />
        <MarketLockList lockList={lockList} />
        <div ref={endRef} />
        <FilterDrawer
          totalLock={totalLock}
          priceFilter={priceFilter}
          setPriceOrderFilter={setPriceOrderFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          coupleImageFilter={coupleImageFilter}
          setCoupleImageFilter={setCoupleImageFilter}
          oneLineFilter={oneLineFilter}
          setOneLineFilter={setOneLineFilter}
          socialProfileFilter={socialProfileFilter}
          setSocialProfileFilter={setSocialProfileFilter}
          isAvailableFilter={isAvailableFilter}
          setIsAvailableFilter={setIsAvailableFilter}
          isDrawerOpen={isDrawerOpen}
          onDrawerOpen={onDrawerOpen}
          onDrawerClose={onDrawerClose}
        />
      </>
    </Layout>
  );
}
