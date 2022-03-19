import axios from "axios";
import _ from "lodash";
import { useCallback, useMemo } from "react";

function useMethods(url) {
  const get = useCallback(
    (options = {}) => {
      let defaultOptions = {
        page: null,
        elementsPerPage: null,
        ids: null,
        sort: {
          value: null,
          order: "asc",
        },
      };

      const mergedOptions = _.merge({}, defaultOptions, options);
      let params = {};

      if (mergedOptions?.page) {
        params._limit = mergedOptions?.elementsPerPage;
      }

      if (mergedOptions?.elementsPerPage) {
        params._page = mergedOptions?.page;
      }

      if (mergedOptions.ids) {
        params.id = mergedOptions?.ids;
      }

      if (mergedOptions?.sort?.value) {
        let value = mergedOptions?.sort?.value;
        let order = mergedOptions?.sort?.order;
        params = {
          ...params,
          _sort: value,
          _order: order,
        };
      }

      let axiosParams = {
        method: "get",
        url,
        params,
      };

      return axios(axiosParams);
    },
    [url]
  );

  const insert = useCallback(
    (data) => {
      let options = {
        method: "post",
        url,
        data,
      };
      return axios(options);
    },
    [url]
  );
  const remove = useCallback(
    (id) => {
      let mergedUrl = `${url}/${id}`;
      let options = {
        method: "delete",
        url: mergedUrl,
      };

      return axios(options);
    },
    [url]
  );
  let repository = useMemo(() => {
    return {
      get,
      insert,
      remove,
    };
  }, [get, insert, remove]);
  return repository;
}

export { useMethods };
