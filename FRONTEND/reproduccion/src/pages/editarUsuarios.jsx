import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../components/menu';
import '../styles/editarUsuarios.css';
import { useParams } from "react-router-dom";
import { getPersona, patchPersona, getUsuario, patchUsuario } from "../api/usuarios";
import { getArtista, patchArtista } from "../api/produccion";

export default function EditarUsuarios() {
  const { id } = useParams();
  const [persona, setPersona] = useState({});
  const [usuario, setUsuario] = useState({});
  const [artista, setArtista] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsuario = await getUsuario(id);
        setUsuario(resUsuario.data);
      } catch (error) {
        try {
          const resArtista = await getArtista(id);
          setArtista(resArtista.data);
        } catch (error) {}
      }

      try {
        const resPersona = await getPersona(id);
        setPersona(resPersona.data);
      } catch (error) {}
    };
    fetchData();
  }, [id]);

  const handlePersonaChange = (e) => {
    setPersona({ ...persona, [e.target.name]: e.target.value });
  };

  const handleUsuarioChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleArtistaChange = (e) => {
    setArtista({ ...artista, [e.target.name]: e.target.value });
  };

  const guardarPersona = async () => {
    try {
      await patchPersona(id, persona);
      alert("Datos personales actualizados");
    } catch (error) {
      alert("Error al actualizar los datos personales");
      console.error(error);
    }
  };

  const guardarUsuario = async () => {
    try {
      await patchUsuario(id, usuario);
      alert("Datos de usuario actualizados");
    } catch (error) {
      alert("Error al actualizar los datos de usuario");
      console.error(error);
    }
  };

  const guardarArtista = async () => {
    try {
      await patchArtista(id, artista);
      alert("Datos de artista actualizados");
    } catch (error) {
      alert("Error al actualizar los datos de artista");
      console.error(error);
    }
  };

  return (
    <div className='pg-editarUsuarios'>
      <div className="menu-container">
        <Menu />
      </div>

      <div className='container-body-editarUsuarios'>
        <div className='content-body-formulario-editarUsuarios'>
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Datos Personales</h1>
            <input
              id="nombres"
              type="text"
              name="nombres"
              placeholder="Nombres"
              value={persona.nombres || ''}
              onChange={handlePersonaChange}
            />
            <div className="input-row">
              <input  id="paterno"  type="text"  name="paterno"  placeholder="Apellido Paterno"  value={persona.paterno || ''}  onChange={handlePersonaChange}/>
              <input  id="materno"  type="text"  name="materno"  placeholder="Apellido Materno"  value={persona.materno || ''}  onChange={handlePersonaChange}/>
            </div>
            <input  id="email"  type="email"  name="email"  placeholder="Correo Electrónico"  value={persona.email || ''}  onChange={handlePersonaChange}/>
            <input  id="telefono"  type="text"  name="telefono"  placeholder="Teléfono"  value={persona.telefono || ''}  onChange={handlePersonaChange}/>
            <input  id="fecha_nacimiento"  type="date"  name="fecha_nacimiento"  value={persona.fecha_nacimiento || ''}  onChange={handlePersonaChange}/>
            <input  id="tipo_persona"  type="text"  name="tipo_persona"  value={persona.tipo_persona || ''}  onChange={handlePersonaChange}/>
            <button type="button" onClick={guardarPersona}>
              Guardar datos personales
            </button>
          </form>

          {persona.tipo_persona === "USUARIO" && (
            <form onSubmit={(e) => e.preventDefault()}>
              <h1>Datos de Usuario</h1>
              <input
                id="nombre_usuario"
                type="text"
                name="nombre_usuario"
                placeholder="Nombre de usuario"
                value={usuario.nombre_usuario || ''}
                onChange={handleUsuarioChange}
              />
              <input
                id="contrasena"
                type="password"
                name="contraseña"
                placeholder="Contraseña"
                value={usuario.contraseña || ''}
                onChange={handleUsuarioChange}
              />
              <button type="button" onClick={guardarUsuario}>
                Guardar datos de usuario
              </button>
            </form>
          )}

          {persona.tipo_persona === "ARTISTA" && (
            <form onSubmit={(e) => e.preventDefault()}>
              <h1>Datos de Artista</h1>
              <input
                id="nacionalidad"
                type="text"
                name="nacionalidad"
                placeholder="Nacionalidad"
                value={artista.nacionalidad || ''}
                onChange={handleArtistaChange}
              />
              <button type="button" onClick={guardarArtista}>
                Guardar datos de artista
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
