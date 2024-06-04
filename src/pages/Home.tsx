import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useContext, useEffect, useRef, useState } from "react";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setPageCount,
  setFilters,
  selectSort,
  selectCategory,
  selectPage,
  selectSearch,
} from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { fetchPizzas, selectPizza } from "../redux/slices/pizzaSlice";

const Home = () => {
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  //selectors
  const sortType = useSelector(selectSort);
  const categoryId = useSelector(selectCategory);
  const currentPage = useSelector(selectPage);
  const { items, status } = useSelector(selectPizza);
  //dispatch
  const dispatch = useDispatch();

  const searchValue = useSelector(selectSearch);
  const [isDesc, setIsDesc] = useState(true);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number: number) => {
    dispatch(setPageCount(number));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sort = sortType.sortProperty;
    const Desc = isDesc ? "desc" : "asc";
    const search = searchValue ? `&search=${searchValue}` : "";
    dispatch(
      //@ts-ignore
      fetchPizzas({
        category,
        sort,
        Desc,
        search,
        currentPage,
      })
    );
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, isDesc, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
        isDesc,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, isDesc, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock {...obj} key={obj.id} />);
  const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort isDesc={isDesc} setDesc={setIsDesc} />
      </div>
      <h2 className="content__title">Всі піци</h2>
      {status == "error" ? (
        <h1>Помилка :\</h1>
      ) : (
        <div className="content__items">
          {status == "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
