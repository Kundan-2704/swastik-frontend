import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../Redux Toolkit/Store";
import { fetchProductById } from "../../../../../Redux Toolkit/Features/Customer/ProductSlice";
export const useProduct = (productId: string) => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(s => s.products.product);

  useEffect(() => {
    if (productId) dispatch(fetchProductById(productId));
  }, [productId]);

  return { product };
};
