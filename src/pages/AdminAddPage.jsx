import { Button, Container, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { AdminContext } from "../contexts/AdminProvider";

function AdminAddPage() {
  const { sendNewPizza } = useContext(AdminContext);

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");

  const handleSubmit = () => {
    const newPizza = {
      name: name.trim(),
      time: time.trim(),
      year: year.trim(),
      price,
      photo: photo.trim(),
    };
    for (let i in newPizza) {
      if (!newPizza[i]) {
        alert("Заполните поля!");
        return;
      }
    }
    sendNewPizza(newPizza);
    setName("");
    setYear("");
    setTime("");
    setPrice("");
    setPhoto("");
  };

  return (
    <div className="admin-add-page">
      <Container>
        <div className="orange">
          <h2>Добавить товары</h2>
        </div>
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
            // label="Год"
            variant="standard"
            type="date"
          />
          <TextField
            value={time}
            onChange={(e) => setTime(e.target.value)}
            // label="Время"
            variant="standard"
            type="time"
          />
          <TextField
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
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
          <Button
            variant="outlined"
            type="submit"
            sx={{ background: "orange", color: "black", fontWeight: "bold" }}
          >
            Добавить
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AdminAddPage;
