import {  useMemo, useRef } from "react";
import { Pagination, PaginationItem } from "reactstrap";
import { StyledPaginationLink } from "../styled.tsx";
import React from 'react';

type PaginationProps = {
    pageIndex: number,
    totalCount: number,
    setPageIndex: Function,
    resetSelections?: Function,
    config?: any
}

export const defaultPaginationConfig = {
    theme: {
        pagination: {
            background: '#11A7D9',
            color: "#022343"
        }
    }
}

const pageSize = 10;

const PaginationComponent: React.FC<PaginationProps> = ({ pageIndex, totalCount, setPageIndex, resetSelections,config=defaultPaginationConfig }) => {
    const anchorRef = useRef<any>();
    const handleClick = (e: any, index: number) => {
        e.preventDefault();
        anchorRef.current?.click();
        setPageIndex(index);
        resetSelections && resetSelections([]);
    };

    const getPageNumbersRange = (i: number) => {
        const unitDigit = pageIndex % 10;
        const tens = (pageIndex - unitDigit) / 10;
        const startIndex = Math.floor(unitDigit / 10) + (tens * 10);
        return (pageCount > 10 && startIndex + 10 > pageCount) ? pageCount - 10 + i : startIndex + i;
    };

    const pageCount = useMemo(() => {
        if (totalCount) {
            return Math.ceil(totalCount / pageSize);
        } else {
            return 0;
        }
    }, [totalCount]);

    const numberOfPages = useMemo(() => {
        return pageCount >= 10 ? 10 : pageCount;
    }, [pageCount]);

    const lastSetCheck = () => {
        const mod = pageCount % 10;
        const sets = Math.floor(pageCount / 10);
        return mod > 0 ? pageIndex <= (sets * 10) - 1 : pageIndex <= pageCount - 11;
    };

    return <div className="w-100 d-flex align-items-center justify-content-center">
        {totalCount > 0 &&
            <Pagination className="me-1 sm-wrap sm-pagination table-pagination" style={{gap: 5, justifyContent: 'center', alignItems: 'center'}}>
                <PaginationItem disabled={pageIndex <= 0}>
                    <StyledPaginationLink
                        onClick={(e: any) => handleClick(e, pageIndex - 1)}
                        previous
                        href="#Pagination"
                        style={{background: '#fff'}}
                    />
                </PaginationItem>
                {(pageIndex > 9 && pageCount > 10) &&
                    <PaginationItem disabled={true}>
                        <StyledPaginationLink style={{background: '#fff'}}
                        > ... </StyledPaginationLink>
                    </PaginationItem>
                }
                {[...Array(numberOfPages)].map((page, i) =>
                    <PaginationItem active={getPageNumbersRange(i) === pageIndex} key={`page-${i + 1}`}>
                        <StyledPaginationLink
                            data-testid={`pagination-${getPageNumbersRange(i) + 1}`}
                            style={{ background: getPageNumbersRange(i) === pageIndex ? config?.theme?.pagination?.background : "", border: getPageNumbersRange(i) === pageIndex ? config?.theme?.pagination?.background : "" }}
                            onClick={(e: any) => handleClick(e, getPageNumbersRange(i))} href="#Pagination">
                            {getPageNumbersRange(i) + 1}
                        </StyledPaginationLink>
                    </PaginationItem>
                )}
                {(lastSetCheck() && pageCount > 10) &&
                    <PaginationItem disabled={true} >
                        <StyledPaginationLink style={{background: '#fff'}}> ... </StyledPaginationLink>
                    </PaginationItem>
                }
                <PaginationItem disabled={pageIndex >= pageCount - 1}>
                    <StyledPaginationLink
                        data-testid="next"
                        onClick={(e: any) => handleClick(e, pageIndex + 1)}
                        next
                    />
                </PaginationItem>
            </Pagination>
        }
        <a className="d-none" ref={anchorRef} />
    </div>;
};


export default PaginationComponent;