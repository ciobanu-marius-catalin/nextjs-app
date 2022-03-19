import { useCallback, useEffect, useState } from "react";
import _ from "lodash";

function useGetData({
  page = 1,
  elementsPerPage = 100,
  columnNames = [],
  error = null,
  setError = _.noop,
  repository = null,
  extraOptions = null,
}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      let fetchResult = await repository.get({
        page,
        elementsPerPage,
        ...extraOptions,
      });
      let fetchedData = _.get(fetchResult, "data", []);

      let columnsToGet = [...columnNames, "id"];
      let filteredData = fetchedData.map((data) => {
        return _.pick(data, columnsToGet);
      });

      setData(filteredData);
      if (error) {
        setError(false);
      }
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [repository, page, elementsPerPage, extraOptions]);

  useEffect(() => {
    fetchData();
  }, [page, extraOptions]);

  return {
    data,
    isLoading,
    error,
    fetchData,
  };
}
export { useGetData };
