import {PageData} from '@/types';
import {useState, useRef, useEffect} from 'react';

type APIFun<T, P> = (param: P) => Promise<PageData<T>>;
const defaultPageParams = {
  pageSize: 10,
  pageNum: 1,
};
type PaginationParam = {
  pageSize: number;
  pageNum: number;
  [propName: string]: any;
};

export default function usePagination<T, P>(
  apiFun: APIFun<T, PaginationParam>,
  initParam?: P,
  defalutValue?: T[],
) {
  // 设置默认分页为十条第一页
  const param = useRef({...defaultPageParams, ...initParam});
  const [data, setData] = useState(defalutValue || []);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [noData, setNoData] = useState(false);
  const [increasing, setIncreasing] = useState(false);

  useEffect(() => {
    if (refreshing) {
      param.current.pageNum = 1;
      fetchList();
    }
  }, [refreshing]);

  useEffect(() => {
    if (increasing) {
      param.current.pageNum += 1;
      fetchList();
    }
  }, [increasing]);
  function fetchList() {
    return apiFun(param.current)
      .then(res => {
        if (res.page.pageNum === 1) {
          setData(res.list);
          setNoData(!!res.list.length);
        } else {
          setNoData(false);
          setData([...data, ...res.list]);
        }
        setHasMore(res.page.pageNum < res.page.totalNum);
      })
      .catch(e => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
        setIncreasing(false);
      });
  }

  return {
    param,
    setParam: (p: P) => (param.current = {...defaultPageParams, ...p}),
    setIncreasing: (bool: boolean) => setIncreasing(bool),
    setRefreshing: (bool: boolean) => setRefreshing(bool),
    error,
    data,
    loading,
    refreshing,
    hasMore,
    noData,
  };
}
