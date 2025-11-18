import React, { useState, useEffect } from 'react';
import Menu from '../components/menu';
import '../styles/editarAlbums.css'; 
import { getAlbums, patchAlbum, deleteAlbum } from '../api/album';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarAlbums() {
  const { id } = useParams(); // Para edición individual
  const [albums, setAlbums] = useState([]);
  const [albumSeleccionado, setAlbumSeleccionado] = useState({});
  const navegar = useNavigate();

  // Cargar todos los álbumes al iniciar
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

  // Seleccionar un álbum para editar
  useEffect(() => {
    if (id && albums.length > 0) {
      const encontrado = albums.find(a => a.id_album === parseInt(id));
      if (encontrado) setAlbumSeleccionado(encontrado);
    }
  }, [id, albums]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setAlbumSeleccionado({ ...albumSeleccionado, [e.target.name]: e.target.value });
  };

  // Guardar cambios de un álbum
  const guardarAlbum = async () => {
    try {
      await patchAlbum(albumSeleccionado.id_album, albumSeleccionado);
      alert("Álbum actualizado correctamente ✅");
      // Actualizar la lista de álbumes localmente
      setAlbums(prev => prev.map(a => a.id_album === albumSeleccionado.id_album ? albumSeleccionado : a));
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el álbum ❌");
    }
  };

  // Eliminar un álbum
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
    <div className="pg-album">
      <div className="menu-container">
        <Menu />
      </div>

      <div className="container-body-album">
        <h1>Álbumes</h1>
        <div className="content-body-formulario-albums">
        
        {id && albumSeleccionado.id_album && (
          <div className="formulario-album">
            <input
              type="text"
              name="titulo"
              placeholder="Título"
              value={albumSeleccionado.titulo || ''}
              onChange={handleChange}
            />
            <input
              type="date"
              name="fecha_lanzamiento"
              value={albumSeleccionado.fecha_lanzamiento || ''}
              onChange={handleChange}
            />
            <input
              type="text"
              name="discografica"
              placeholder="Discográfica"
              value={albumSeleccionado.discografica || ''}
              onChange={handleChange}
            />
            <button type="button" onClick={guardarAlbum}>Guardar cambios</button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
