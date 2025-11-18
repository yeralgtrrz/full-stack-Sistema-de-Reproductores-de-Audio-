import React, { useState } from "react";
import { postPersona } from "../api/usuarios";
import { postArtista } from "../api/produccion";
import Menu from '../components/menu.jsx';
import "../styles/registroArtistas.css";

export default function RegistroArtistas() {
  const [registroPersona, setRegistroPersona] = useState(true);
  const [registroArtista, setRegistroArtista] = useState(false);
  const [persona, setPersona] = useState({
    nombres: "",
    paterno: "",
    materno: "",
    email: "",
    telefono: "",
    fecha_nacimiento: "",
    tipo_persona: "ARTISTA",
  });
  const [artista, setArtista] = useState({
    nacionalidad: "",
  });

  const cambiarPersona = (e) => {
    const { name, value } = e.target;
    setPersona({ ...persona, [name]: value });
  };

  const cambiarArtista = (e) => {
    const { name, value } = e.target;
    setArtista({ ...artista, [name]: value });
  };

  const siguiente = (e) => {
    e.preventDefault();
    setRegistroPersona(false);
    setRegistroArtista(true);
  };

  const guardar = async (e) => {
    e.preventDefault();
    try {
      const resPersona = await postPersona(persona);
      const idPersona = resPersona.data?.id_persona;
      await postArtista({ ...artista, id_persona: idPersona });
      alert("Artista registrado con éxito");
    } catch {
      alert("Error al registrar el artista");
    }
  };

  return (
    <div className="pg-registroArtistas">
      <div className="menu-container">
        <Menu />
      </div>
      <div className="container-body-registroPersona">
        {registroPersona && (
          <div className="content-body-formulario-registroPersona">
            <form onSubmit={siguiente}>
              <h1>Registrar Persona</h1>
              <input type="text" name="nombres" placeholder="Nombres" value={persona.nombres} onChange={cambiarPersona} required />
              <input type="text" name="paterno" placeholder="Apellido Paterno" value={persona.paterno} onChange={cambiarPersona} required />
              <input type="text" name="materno" placeholder="Apellido Materno" value={persona.materno} onChange={cambiarPersona} required />
              <input type="email" name="email" placeholder="email Electrónico" value={persona.email} onChange={cambiarPersona} required />
              <input type="text" name="telefono" placeholder="Teléfono" value={persona.telefono} onChange={cambiarPersona} required />
              <input type="date" name="fecha_nacimiento" value={persona.fecha_nacimiento} onChange={cambiarPersona} required />
              <button type="submit">Siguiente</button>
            </form>
          </div>
        )}
      </div>
      <div className="container-body-registroArtista">
      {registroArtista && (
        <div className="content-body-formulario-registroArtista">
          <form onSubmit={guardar}>
            <h1>Registrar Artista</h1>
            <input type="text" name="nacionalidad" placeholder="Nacionalidad" value={artista.nacionalidad} onChange={cambiarArtista} required />
            <button type="submit">Guardar</button>
          </form>
        </div>
      )}
      </div>
    </div>
  );
}
