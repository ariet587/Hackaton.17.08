import React from "react";
import { pizzApi } from "../helpers/Const";

export const ClientContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_PIZZA") {
    return {
      ...state,
      Pizza: action.payload,
    };
  }
  if (action.type === "GET_PIZZA_FROM_BASKET") {
    return {
      ...state,
      basketPizza: action.payload,
    };
  }
  if (action.type === "GET_BASKET_COUNT") {
    return {
      ...state,
      basketCount: action.payload,
    };
  }
  return state;
};

function ClientProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    Pizza: [],
  });

  const [searchWord, setSearchWord] = React.useState("");

  const [filterByPrice, setFilterByPrice] = React.useState([0, 5000]);
  const [minMax, setMinMax] = React.useState([0, 5000]);
  const limit = 4;
  const [pagesCount, setPagesCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  const getPizza = () => {
    fetch(
      `${pizzApi}?q=${searchWord}&price_gte=${filterByPrice[0]}&price_lte=${filterByPrice[1]}
      &_limit=${limit}&_page=${currentPage}`
    )
      .then((res) => {
        let count = Math.ceil(res.headers.get("X-Total-Count") / limit);
        setPagesCount(count);
        return res.json();
      })
      .then((data) => {
        let action = {
          type: "GET_PIZZA",
          payload: data,
        };
        dispatch(action);
      });
  };

  const addPizzaToBasket = (Pizza) => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        totalPrice: 0,
        products: [],
      };
    }
    let PizzaToBasket = {
      ...Pizza,
      count: 1,
      subPrice: Pizza.price,
    };

    let chek = basket.products.find((item) => {
      return item.id === PizzaToBasket.id;
    });
    if (chek) {
      basket.products = basket.products.map((item) => {
        if (item.id === PizzaToBasket.id) {
          item.count++;
          item.subPrice = item.count * item.price;
          return item;
        }
        return item;
      });
    } else {
      basket.products.push(PizzaToBasket);
    }
    basket.totalPrice = basket.products.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    localStorage.setItem("basket", JSON.stringify(basket));
    getBasketCount();
  };

  const getPizzaFromBasket = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    let action = {
      type: "GET_PIZZA_FROM_BASKET",
      payload: basket,
    };
    dispatch(action);
  };

  const getPricer = () => {
    fetch(pizzApi)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => a.price - b.price);
        let max = data[data.length - 1].price;
        let min = data[0].price;
        setFilterByPrice([min, max]);
        setMinMax([min, max]);
      });
  };

  const getBasketCount = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        products: [],
      };
    }
    let action = {
      type: "GET_BASKET_COUNT",
      payload: basket.products.length,
    };
    dispatch(action);
  };
  React.useEffect(() => {
    getPricer();
    getBasketCount();
  }, []);

  const data = {
    Pizza: state.Pizza,
    searchWord,
    filterByPrice,
    pagesCount,
    currentPage,
    basketPizza: state.basketPizza,
    minMax,
    basketCount: state.basketCount,
    getPizza,
    setSearchWord,
    setFilterByPrice,
    setCurrentPage,
    addPizzaToBasket,
    getPizzaFromBasket,
  };
  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}
export default ClientProvider;
