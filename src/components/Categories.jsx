import { useState } from "react";

function Categories({ value, onChangeCategory }) {
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
export default Categories;
