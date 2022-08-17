import React, { createContext, useReducer } from "react";
import { pizzApi } from "../helpers/Const";

export const AdminContext = createContext();

const reducer = (state, action) => {
  if (action.type === "GET_PIZZA") {
    return {
      ...state,
      Pizza: action.payload,
    };
  }
  if (action.type === "GET_PIZZA_TO_EDIT") {
    return {
      ...state,
      PizzaToEdit: action.payload,
    };
  }
  return state;
};

function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    Pizza: [],
    PizzaToEdit: null,
  });

  const sendNewPizza = (newPizza) => {
    fetch(pizzApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPizza),
    });
  };
  // !

  const getPizza = () => {
    fetch(pizzApi)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_PIZZA",
          payload: data,
        };
        dispatch(action);
      });
  };

  // ! delete
  const deletePizza = (id) => {
    fetch(`${pizzApi}/${id}`, {
      method: "DELETE",
    }).then(() => getPizza());
  };
  // !

  // ! update edit
  const getPizzaToEdit = (id) => {
    fetch(`${pizzApi}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_PIZZA_TO_EDIT",
          payload: data,
        };
        dispatch(action);
      });
  };

  // ! update save

  const saveEditPizza = (editPizza) => {
    fetch(`${pizzApi}/${editPizza.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editPizza),
    });
  };
  const data = {
    Pizza: state.Pizza,
    PizzaToEdit: state.PizzaToEdit,
    sendNewPizza,
    getPizza,
    deletePizza,
    getPizzaToEdit,
    saveEditPizza,
  };
  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
}

export default AdminProvider;
