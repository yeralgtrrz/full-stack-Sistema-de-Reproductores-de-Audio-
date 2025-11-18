import React, { useState, useEffect } from 'react';
import Menu from '../components/menu';
import '../styles/Album.css'; // Puedes usar el mismo CSS de principal si quieres
import { getAlbums, deleteAlbum } from '../api/album'; // Asegúrate de crear estas funciones
import { useNavigate } from 'react-router-dom';

export default function Album() {
  const [albums, setAlbums] = useState([]);
  const navegar = useNavigate();

  useEffect(() => {
    const cargarAlbums = async () => {
      try {
        const res = await getAlbums();
        setAlbums(res.data);
      } catch (error) {
        console.error("Error al cargar álbumes:", error);
      }
    };
    cargarAlbums();
  }, []);

  const eliminarAlbumHandler = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este álbum?");
    if (!confirmar) return;

    try {
      await deleteAlbum(id);
      setAlbums(prev => prev.filter(a => a.id_album !== id));
      alert("Álbum eliminado correctamente ✅");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el álbum ❌");
    }
  };

  return (
    <div className='pg-album'>
      <div className="menu-container">
        <Menu />
      </div>

      <div className='container-body-album'>
        <h1>Álbumes</h1>
        <button className="btn-agregar" 
        onClick={() => navegar("/registroAlbums")}
        >
          Crear álbum
        </button>

        <table className="tabla-principal">
          <thead>
            <tr>
              <th>ID Álbum</th>
              <th>Título</th>
              <th>Fecha de Lanzamiento</th>
              <th>Discográfica</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album) => (
              <tr key={album.id_album}>
                <td>{album.id_album}</td>
                <td>{album.titulo}</td>
                <td>{album.fecha_lanzamiento}</td>
                <td>{album.discografica}</td>
                <td className="acciones-canciones">
                  <button
                    className="btn-editar"
                    onClick={() => navegar(`/editarAlbums/${album.id_album}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarAlbumHandler(album.id_album)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
