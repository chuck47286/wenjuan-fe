import React, { FC, useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '../constant';

type PropsType = {
  total: number;
};

const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props;
  const [current, SetCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
    SetCurrent(page);
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') ||
      LIST_PAGE_SIZE;
    setPageSize(pageSize);
  }, [searchParams]);

  const nav = useNavigate();
  const { pathname } = useLocation();
  function handlePageChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());

    nav({
      pathname,
      search: searchParams.toString(),
    });
  }

  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={handlePageChange}
    />
  );
};
export default ListPage;
