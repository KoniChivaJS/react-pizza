import React from "react";
import { useWhyDidYouUpdate } from "ahooks";
type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onChangeCategory }) => {
    const categories = [
      "Всі",
      "М`ясні",
      "Вегетаріанські",
      "Гриль",
      "Гострі",
      "Закриті",
    ];
    return (
      <div className="categories">
        <ul>
          {categories.map((el, index) => (
            <li
              onClick={() => onChangeCategory(index)}
              className={value === index ? "active" : ""}
              key={index}
            >
              {el}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
export default Categories;
