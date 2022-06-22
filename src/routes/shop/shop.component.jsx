import { Fragment as div, useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import "./shop.styles.scss";

const Shop = () => {
  const { categoryMap } = useContext(CategoriesContext);

  return (
    <div className="shop-container">
      {Object.keys(categoryMap).map((title) => {
        const products = categoryMap[title];

        return (
          <CategoryPreview title={title} products={products} key={title} />
        );
      })}
    </div>
  );
};

export default Shop;
