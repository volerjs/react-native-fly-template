import {useEffect, useState, useRef, useCallback} from 'react';

type APIFunc<T, P> = (params?: P) => Promise<T>;

export default function useFetch<T, P>(
  apiFun: APIFunc<T, P>,
  initParam?: P,
  defalutValue?: T,
) {
  const param = useRef(initParam);
  const [data, setData] = useState(defalutValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    if (loading) {
      apiFun(param.current)
        .then(res => {
          setData(res);
          setError('');
        })
        .catch(e => {
          setError(e);
          setData(defalutValue);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);
  return {
    param,
    setParam: useCallback((p: P) => (param.current = p), []),
    error,
    data,
    loading,
    setLoading,
  };
}
