import { createContext, useState, useEffect } from "react";
import SHOP_DATA from "../shop-data.js";
import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../utils/firebase.utils.js";

export const CategoriesContext = createContext({
  categoryMap: {},
  setCategoryMap: () => null,
});

export const CategoriesProvider = ({ children }) => {
  const [categoryMap, setCategoryMap] = useState({});
  const value = {
    categoryMap,
  };

  useEffect(() => {
    const getCategoriesAsync = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoryMap(categoryMap);
    };

    getCategoriesAsync();
  }, []);

  // useEffect(() => addCollectionAndDocuments("categories", SHOP_DATA), []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
