import React from "react";

function Footer() {
  return (
    <div>
      <div className="contact-block">
        <h2>КОНТАКТ</h2>
        <h3>
          Тел номер: +996559966331 / Pizza@gmail.com <br /> Кыргызстан Город
          Бишкек Тыбышалиева 29
          <br /> Работаем 9:00 до 21:00
        </h3>

        <input placeholder="Имя" type="text" />
        <input placeholder="Email" type="email" />
        <input placeholder="Названия пицы" type="text" />
        <input placeholder="Сообщение" type="text" />
        <button>Submit</button>
      </div>
    </div>
  );
}

export default Footer;
