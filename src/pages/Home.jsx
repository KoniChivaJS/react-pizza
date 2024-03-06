import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useEffect, useState } from "react";

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярністю",
    sortProperty: "rating",
  });
  const [isDesc, setIsDesc] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sort = sortType.sortProperty;
    const Desc = isDesc ? "desc" : "asc";
    const search = searchValue ? `&search=${searchValue}` : "";
    fetch(
      `https://65c7cc54e7c384aada6ef7f5.mockapi.io/items?${category}&sortBy=${sort}&order=${Desc}${search}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return [];
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, isDesc, searchValue]);

  const pizzas = items.map((obj) => <PizzaBlock {...obj} key={obj.id} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => setCategoryId(id)}
        />
        <Sort
          value={sortType}
          onChangeSort={(i) => setSortType(i)}
          isDesc={isDesc}
          setDesc={setIsDesc}
        />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </div>
  );
};

export default Home;
