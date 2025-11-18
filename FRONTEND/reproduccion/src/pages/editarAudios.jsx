import React, { useState, useEffect } from 'react';
import Menu from '../components/menu';
import '../styles/editarAudios.css';
import { useParams } from "react-router-dom";

import { getAudio, patchAudio, getCancion, patchCancion, getPodcast, patchPodcast } from "../api/produccion";


export default function EditarAudios() {
  const { id } = useParams();
  const [audio, setAudio] = useState({});
  const [cancion, setCancion] = useState({});
  const [podcast, setPodcast] = useState({});

  useEffect(() => {
    const fetchData = async () => { 
      try {
        const resAudio = await getAudio(id);
        setAudio(resAudio.data);

        if (resAudio.data.tipo_audio === "CANCION") {
          const resCancion = await getCancion(id);
          setCancion(resCancion.data);
        } else if (resAudio.data.tipo_audio === "PODCAST") {
          const resPodcast = await getPodcast(id);
          setPodcast(resPodcast.data);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleAudioChange = (e) => setAudio({ ...audio, [e.target.name]: e.target.value });
  const handleCancionChange = (e) => setCancion({ ...cancion, [e.target.name]: e.target.value });
  const handlePodcastChange = (e) => setPodcast({ ...podcast, [e.target.name]: e.target.value });

  const guardarAudio = async () => {
  try {
    let audioData = { ...audio };

    // Convertir duración si viene como Date o tiempo local a string HH:MM:SS
    if (audioData.duracion instanceof Date) {
      const h = String(audioData.duracion.getHours()).padStart(2, '0');
      const m = String(audioData.duracion.getMinutes()).padStart(2, '0');
      const s = String(audioData.duracion.getSeconds()).padStart(2, '0');
      audioData.duracion = `${h}:${m}:${s}`;
    }

    // Si ya es string, asegurarse de que tenga formato HH:MM:SS
    if (typeof audioData.duracion === 'string' && !audioData.duracion.includes(':')) {
      audioData.duracion = `00:00:${audioData.duracion.padStart(2, '0')}`;
    }

    await patchAudio(id, audioData);
    alert("Datos de audio actualizados correctamente ✅");
  } catch (error) {
    console.error("Error al guardar audio:", error);
    alert("Error al guardar datos de audio ❌");
  }
};


  const guardarCancion = async () => {
    try {
      await patchCancion(id, cancion);
      alert("Datos de canción actualizados correctamente ✅");
    } catch (error) {
      console.error("Error al guardar canción:", error);
      alert("Error al guardar datos de canción ❌");
    }
  };

  const guardarPodcast = async () => {
    try {
      await patchPodcast(id, podcast);
      alert("Datos de podcast actualizados correctamente ✅");
    } catch (error) {
      console.error("Error al guardar podcast:", error);
      alert("Error al guardar datos de podcast ❌");
    }
  };

  return (
    <div className='pg-audios'>
      <div className="menu-container">
        <Menu />
      </div>
      <div className='container-body-audios'>
        <div className='content-body-formulario-audios'>
          <h1>Datos de Audio</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="number" name="id_audio" placeholder="id_audio" value={audio.id_audio || ''} onChange={handleAudioChange} disabled />
            <input type="text" name="titulo" placeholder="Titulo" value={audio.titulo || ''} onChange={handleAudioChange} />
            <input type="text" name="duracion" placeholder="Duración" value={audio.duracion || ''} onChange={handleAudioChange} />
            <input type="date" name="fecha_publicacion" value={audio.fecha_publicacion || ''} onChange={handleAudioChange} />
            <input type="text" name="tipo_audio" placeholder="Tipo de audio" value={audio.tipo_audio || ''} onChange={handleAudioChange} disabled />
            <input type="text" name="descripcion" placeholder="Descripción" value={audio.descripcion || ''} onChange={handleAudioChange} />
            <input type="text" name="ruta_archivo" placeholder="Ruta archivo" value={audio.ruta_archivo || ''} onChange={handleAudioChange} />
            <button type="button" onClick={guardarAudio}>
              Guardar
            </button>
          </form>

          {audio.tipo_audio === "CANCION" && (
            <div className="content-body-formulario-cancion">
              <h1>Datos de Cancion</h1>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="number" name="numero_pista" placeholder="Número de pista" value={cancion.numero_pista || ''} onChange={handleCancionChange} />
              <input type="text" name="idioma" placeholder="Idioma" value={cancion.idioma || ''} onChange={handleCancionChange} />
              <button type="button" onClick={guardarCancion}>
                Guardar
              </button>
            </form>
            </div>
          )}

          {audio.tipo_audio === "PODCAST" && (
            <div className="content-body-formulario-podcast">
              <h1>Datos de Podcast</h1>
              <form onSubmit={(e) => e.preventDefault()}>
                <input type="number" name="temporada" placeholder="Temporada" value={podcast.temporada || ''} onChange={handlePodcastChange} />
                <input type="number" name="episodio" placeholder="Episodio" value={podcast.episodio || ''} onChange={handlePodcastChange} />
                <button type="button" onClick={guardarPodcast}>
                  Guardar
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
