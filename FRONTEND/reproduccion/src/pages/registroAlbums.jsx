import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from '../components/menu.jsx';
import { postAlbum, postComponen } from "../api/album.js";
import "../styles/RegistroAlbums.css";

export default function RegistroAlbums() {
  const navigate = useNavigate();
  const [album, setAlbum] = useState({
    titulo: "",
    fecha_lanzamiento: "",
    discografica: ""
  });
  const [componente, setComponente] = useState({
    id_album: "",
    id_artista: ""
  });

  const cambiarAlbum = (e) => {
    const { name, value } = e.target;
    setAlbum({ ...album, [name]: value });
  };

  const guardarAlbum = async (e) => {
    e.preventDefault();
    try {
      const resAlbum = await postAlbum(album);
      const idAlbum = resAlbum.data?.id_album;
      if (componente.id_artista) {
        await postComponen({ ...componente, id_album: idAlbum });
      }
      alert("Álbum registrado con éxito");
      navigate("/albums");
    } catch {
      alert("Error al registrar el álbum");
    }
  };

  return (
    <div className="pg-registroAlbums">
      <div className="menu-container">
        <Menu />
      </div>

      <div className="container-body-registroAlbum">
        <div className="content-body-formulario-registroAlbum">
          <form onSubmit={guardarAlbum}>
            <h1>Registrar Álbum</h1>
            <input
              type="text"
              name="titulo"
              placeholder="Título"
              value={album.titulo}
              onChange={cambiarAlbum}
              required
            />
            <input
              type="date"
              name="fecha_lanzamiento"
              placeholder="Fecha de Lanzamiento"
              value={album.fecha_lanzamiento}
              onChange={cambiarAlbum}
              required
            />
            <input
              type="text"
              name="discografica"
              placeholder="Discográfica"
              value={album.discografica}
              onChange={cambiarAlbum}
              required
            />
            <button type="submit">Guardar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
