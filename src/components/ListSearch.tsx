import React, { FC, useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Input } from 'antd';
import { LIST_SEARCH_PARAM_KEY } from '../constant';

const { Search } = Input;
const ListSearch: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const [value, setValue] = useState('');
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  // 获取 url 参数，并设置到input value
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const curval = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
    setValue(curval);
  }, [searchParams]);

  function handleSearch(value: string) {
    // 跳转页面，增加URL参数
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  }

  return (
    <Search
      placeholder="输入关键字"
      size="large"
      allowClear
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: '260px' }}
    />
  );
};

export default ListSearch;
