import React from "react";
import '../styles/menu.css';
import { Link } from "react-router-dom";

export default function Menu() {

  const menuItems = [
    { nombre: "Inicio", ruta: "/" },
    { nombre: "Artistas", ruta: "/artistas" },
    { nombre: "Usuarios", ruta: "/usuarios" },
    { nombre: "Albums", ruta: "/albums" },
  ];

  return (
    <nav>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.ruta}>{item.nombre}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
