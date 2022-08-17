import React from "react";
import {
  Container,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Slider,
  Pagination,
} from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import { ClientContext } from "../contexts/ClientProvider";

function MainPage() {
  const {
    getPizza,
    setFilterByPrice,
    filterByPrice,
    Pizza,
    addPizzaToBasket,
    minMax,
    setCurrentPage,
    currentPage,
    pagesCount,
  } = React.useContext(ClientContext);

  React.useEffect(() => {
    getPizza();
  }, [filterByPrice, currentPage]);
  console.log(filterByPrice);
  return (
    <div className="main-page bac">
      <Container>
        <h2>МЕНЮ</h2>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.papajohns.kg//images/banners/0f8e2a23a64c4c3fd4bd79675875648e.webp"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>15% для именинников</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.papajohns.kg//images/banners/7aa6a862965f75695a2de1fc621f1ea2.webp"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>15% скидка студентам на все-все пиццы</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://api.papajohns.kg//images/banners/a081ce55fd9627671868fe3e83c4f512.webp"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Закажи пицу и получи Pepsi</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className="filter-block">
          <h4>Фильтрация по цене:</h4>
          <Slider
            sx={{ color: "black" }}
            className="slider"
            min={minMax[0]}
            max={minMax[1]}
            valueLabelDisplay="auto"
            value={filterByPrice}
            onChange={(_, newValue) => setFilterByPrice(newValue)}
          />
        </div>

        <div className="products">
          {Pizza.map((item) => (
            <Card
              key={item.id}
              className="products-card"
              sx={{ width: "273px" }}
            >
              <CardMedia
                component="img"
                height={280}
                image={item.photo}
                sx={{ background: "pink" }}
              />
              <CardContent sx={{ background: "orange" }}>
                <Typography
                  className="product-card-title"
                  gutterBottom
                  variant="h5"
                  sx={{ fontweight: 700 }}
                  component="div"
                >
                  {item.name}
                </Typography>
                <ul className="product-card-ul">
                  <li>
                    <span>Название:</span>
                    <span>{item.name}</span>
                  </li>
                  <li>
                    <span>Дата выпуска:</span>
                    <span>{item.year}</span>
                  </li>
                  <li>
                    <span>Время выпуска:</span>
                    <span>{item.time}</span>
                  </li>
                  <li>
                    <span>Цена:</span>
                    <span>{item.price} сом</span>
                  </li>
                </ul>
              </CardContent>
              <Button
                onClick={() => addPizzaToBasket(item)}
                variant="outlined"
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  borderColor: "black",
                  background: "orange",
                  height: "40px",
                  width: "273px",
                }}
              >
                Добавить в корзину
              </Button>
            </Card>
          ))}
        </div>
        <div className="pagination-block">
          <Pagination
            onChange={(_, newValue) => setCurrentPage(newValue)}
            count={pagesCount}
            variant="outlined"
            shape="rounded"
            sx={{ color: "orange" }}
          />
        </div>
      </Container>
    </div>
  );
}

export default MainPage;
