import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../components/menu';
import '../styles/artistas.css';
import { getArtistas, deleteArtista } from '../api/produccion';
import { useNavigate } from 'react-router-dom';

export default function Artistas() {
  const navegar = useNavigate();
  const [artistas, setArtistas] = useState([]);

  useEffect(() => {
    const cargarArtistas = async () => {
      try {
        const respuestaArtistas = await getArtistas();
        setArtistas(respuestaArtistas.data);
      } catch (error) {
        console.error('Error al obtener artistas:', error);
      }
    };
    cargarArtistas();
  }, []);

  const eliminarArtista = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este artista?");
    if (!confirmar) return;

    try {
      await deleteArtista(id);
      alert("Artista eliminado correctamente ✅");
      setArtistas((prev) => prev.filter((a) => a.id_persona !== id));
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el artista ❌");
    }
  };

  return (
    <div className='pg-artistas'>
      <div className="menu-container">
        <Menu />
      </div>
      <div className='container-body-artistas'>
        <h1>Artistas</h1>
        <button className="btn-agregar" 
        onClick={() => navegar("/registroArtistas")}
        >crear audio</button>
        <table className="tabla-artistas">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nacionalidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {artistas.map((artista) => (
              <tr key={artista.id_persona}>
                <td>{artista.id_persona}</td>
                <td>{artista.nacionalidad}</td>
                <td className="acciones-artistas">
                  <button  className="btn-editar"  onClick={() => navegar(`/editarUsuarios/${artista.id_persona}`)}>  Editar</button>

                  <button  className="btn-eliminar"  onClick={() => eliminarArtista(artista.id_persona)}>  Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
