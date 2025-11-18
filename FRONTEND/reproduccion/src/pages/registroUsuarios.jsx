import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postPersona, postUsuario } from "../api/usuarios";
import Menu from '../components/menu.jsx';
import "../styles/registroUsuarios.css";

export default function RegistroUsuarios() {
  const navigate = useNavigate();
  const [registroPersona, setRegistroPersona] = useState(true);
  const [registroUsuario, setRegistroUsuario] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  
  const fechaActual = new Date().toISOString().split("T")[0];

  const [persona, setPersona] = useState({
    nombres: "",
    paterno: "",
    materno: "",
    email: "",
    telefono: "",
    fecha_nacimiento: "",
    tipo_persona: "USUARIO",
  });
  
  const [usuario, setUsuario] = useState({
    nombre_usuario: "",
    fecha_registro: fechaActual,
    contraseña: "",
  });

  const cambiarPersona = (e) => {
    const { name, value } = e.target;
    setPersona({ ...persona, [name]: value });
  };

  const cambiarUsuario = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const siguiente = (e) => {
    e.preventDefault();
    setRegistroPersona(false);
    setRegistroUsuario(true);
  };

  const guardar = async (e) => {
    e.preventDefault();
    setMensajeError("");
    try {
      const resPersona = await postPersona(persona);
      const idPersona = resPersona.data?.id_persona;
      await postUsuario({ ...usuario, id_persona: idPersona });
      alert("Usuario registrado con éxito");
      navigate("/usuarios");
    } catch {
      alert("Error al registrar el usuario");
    }
  };

  return (
    <div className="pg-registroUsuarios">
      <div className="menu-container">
        <Menu />
      </div>

      <div className="container-body-registroPersona">
        {registroPersona && (
          <div className="content-body-formulario-registroPersona">
            <form onSubmit={siguiente}>
              <h1>Registrar Persona</h1>
              <input type="text" name="nombres" placeholder="Nombres" value={persona.nombres} onChange={cambiarPersona} required />
              <div className="input-row">
                <input type="text" name="paterno" placeholder="Apellido Paterno" value={persona.paterno} onChange={cambiarPersona} required />
                <input type="text" name="materno" placeholder="Apellido Materno" value={persona.materno} onChange={cambiarPersona} required />
              </div>
              <input type="email" name="email" placeholder="email Electrónico" value={persona.email} onChange={cambiarPersona} required />
              <input type="text" name="telefono" placeholder="Teléfono" value={persona.telefono} onChange={cambiarPersona} required />
              <input type="date" name="fecha_nacimiento" value={persona.fecha_nacimiento} onChange={cambiarPersona} required />
              <button type="submit">Siguiente</button>
            </form>
          </div>
        )}
      </div>

      <div className="container-body-registroUsuario">
        {registroUsuario && (
          <div className="content-body-formulario-registroUsuario">
            <form onSubmit={guardar}>
              <h1>Registrar Usuario</h1>
              <input type="text" name="nombre_usuario" placeholder="Nombre de Usuario" value={usuario.nombre_usuario} onChange={cambiarUsuario} required />
              <input type="password" name="contraseña" placeholder="Contraseña" value={usuario.contraseña} onChange={cambiarUsuario} required />
              <button type="submit">Guardar</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
