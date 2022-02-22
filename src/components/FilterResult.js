import React from 'react';
import styles from './FilterResult.module.scss';
import styled from 'styled-components';

function FilterResult({ option }) {
	return (
        <div className={styles.filterContainer}>
            <div className={styles.filterBox}>
                <FilterText filter={option.price.desc.toString()}>    내림차순  </FilterText>
                <FilterText filter={option.price.asc.toString()}>     오름차순  </FilterText>
                <FilterText filter={option.isAvailable.toString()}>   구매가능만</FilterText>
                <FilterText filter={option.date.toString()}>          만난날짜  </FilterText>
                <FilterText filter={option.oneLine.toString()}>       한줄문장  </FilterText>
                <FilterText filter={option.coupleImage.toString()}>   커플사진  </FilterText>
                <FilterText filter={option.socialProfile.toString()}> 소셜프로필</FilterText>
            </div>
        </div>
	);
}

export default FilterResult;

const FilterText = styled.div`
    border-radius: 1rem;
    padding: 0.3rem 0.5rem 0rem 0.5rem;
    background-color: #805ad5;
    color: white;
    display: ${props => (props.filter == 'false') ? 'none' : 'block'}
`