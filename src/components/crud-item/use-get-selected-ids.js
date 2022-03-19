import { useRouter } from "next/router";
import { useMemo } from "react";

function useGetSelectedIds() {
  const router = useRouter();
  const { id } = router.query;

  let itemsIds = useMemo(() => {
    let isSingleCard = !id || !isNaN(id);
    let itemsIds = [];
    if (isSingleCard) {
      itemsIds = [id];
    } else {
      try {
        itemsIds = JSON.parse(id);
      } catch (e) {
        console.error(e);
      }
    }
    return itemsIds;
  }, [id]);

  return itemsIds;
}

export { useGetSelectedIds };
