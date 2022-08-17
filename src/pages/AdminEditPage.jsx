import { Container, TextField, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../contexts/AdminProvider";

function AdminEditPage() {
  const { getPizzaToEdit, PizzaToEdit, saveEditPizza } =
    useContext(AdminContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");

  const handleSubmit = () => {
    const editPizza = {
      name,
      year,
      time,
      price,
      photo,
      id,
    };
    for (let i in editPizza[i]) {
      if (typeof editPizza[i] === "string") {
        if (!editPizza[i].trim) {
          alert("Заполните поля");
          return;
        }
      }
    }
    saveEditPizza(editPizza);
    navigate("/admin");
  };

  useEffect(() => {
    getPizzaToEdit(id);
  }, []);

  useEffect(() => {
    if (PizzaToEdit) {
      setName(PizzaToEdit.name);
      setYear(PizzaToEdit.year);
      setTime(PizzaToEdit.time);
      setPrice(PizzaToEdit.price);
      setPhoto(PizzaToEdit.photo);
    }
  }, [PizzaToEdit]);
  return (
    <div className="admin-edit-page">
      <Container>
        <h2>Редактировать</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Название"
            variant="standard"
          />
          <TextField
            value={year}
            onChange={(e) => setYear(e.target.value)}
            label="Год"
            variant="standard"
            type="date"
          />
          <TextField
            value={year}
            onChange={(e) => setTime(e.target.value)}
            label="Время"
            variant="standard"
            type="time"
          />
          <TextField
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            label="Цена"
            variant="standard"
            type="number"
          />
          <TextField
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            label="Картинка"
            variant="standard"
          />
          <Button variant="outlined" type="submit">
            Изменить
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AdminEditPage;
