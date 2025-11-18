import React, { useState, useEffect } from 'react';
import Menu from '../components/menu.jsx';
import '../styles/principal.css';
import { getCanciones, deleteCancion, getPodcasts, deletePodcast, deleteAudio } from '../api/produccion.js';
import { useNavigate } from 'react-router-dom';


export default function Principal() {
  
  const [canciones, setCanciones] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const navegar = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resCanciones = await getCanciones();
        setCanciones(resCanciones.data);
      } catch (error) {
        console.error("Error al cargar canciones:", error);
      }

      try {
        const resPodcasts = await getPodcasts();
        setPodcasts(resPodcasts.data);
      } catch (error) {
        console.error("Error al cargar podcasts:", error);
      }
    };
    cargarDatos();
  }, []);

  const eliminarCancion = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar esta canción?");
    if (!confirmar) return;

    try {
      await deleteCancion(id);
      await deleteAudio(id);
      setCanciones(prev => prev.filter(c => c.id_audio !== id));
      alert("Canción y audio eliminados correctamente ✅");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar la canción o el audio ❌");
    }
  };

  const eliminarPodcast = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este podcast?");
    if (!confirmar) return;

    try {
      await deletePodcast(id);
      await deleteAudio(id);
      setPodcasts(prev => prev.filter(p => p.id_audio !== id));
      alert("Podcast y audio eliminados correctamente ✅");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el podcast o el audio ❌");
    }
  };

  return (
    <div className="pg-principal">
      <div className="menu-container">
        <Menu />
      </div>
      <div className="container-body-principal">
        <h1>Canciones</h1>
        <table className="tabla-principal">
          <thead>
            <tr>
              <th>Audio</th>
              <th>Número de Pista</th>
              <th>Idioma</th>
              <th>ID Album</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {canciones.map((cancion) => {

            return (
              <tr key={cancion.id_audio}>
                <td>
                  {cancion.ruta ? (
                    <audio controls>
                      <source src={cancion.ruta} type="audio/mpeg" />
                    </audio>
                  ) : (
                    "Sin audio"
                  )}
                </td>
                <td>{cancion.numero_pista}</td>
                <td>{cancion.idioma}</td>
                <td>{cancion.id_album}</td>
                <td className="acciones-canciones">
                  <button
                    className="btn-editar"
                    onClick={() => navegar(`/editarAudios/${cancion.id_audio}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarCancion(cancion.id_audio)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        </table>

        <h1>Podcasts</h1>
        <table className="tabla-principal">
          <thead>
            <tr>
              <th>ID</th>
              <th>Temporada</th>
              <th>Episodio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {podcasts.map((podcast) => (
              <tr key={podcast.id_audio}>
                <td>
                  {podcast.ruta ? (      // ✅ usar podcast.ruta
                    <audio controls>
                      <source src={podcast.ruta} type="audio/mpeg" />
                    </audio>
                  ) : (
                    "Sin audio"
                  )}
                </td>
                <td>{podcast.temporada}</td>
                <td>{podcast.episodio}</td>
                <td className="acciones-canciones">
                  <button
                    className="btn-editar"
                    onClick={() => navegar(`/editarAudios/${podcast.id_audio}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarPodcast(podcast.id_audio)}
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
