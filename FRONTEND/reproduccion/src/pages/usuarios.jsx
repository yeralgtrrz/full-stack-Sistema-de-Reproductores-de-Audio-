import React, { useState, useEffect } from 'react';
import Menu from '../components/menu.jsx';
import '../styles/usuarios.css';
import { useNavigate } from 'react-router-dom';
import { getUsuarios, deleteUsuario, deletePersona } from '../api/usuarios';

export default function Usuarios() {
  const navegar = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resUsuarios = await getUsuarios();
        setUsuarios(resUsuarios.data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };
    cargarDatos();
  }, []);

  const eliminarUsuario = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este usuario?");
    if (!confirmar) return;

    try {
      await deleteUsuario(id);
      await deletePersona(id);
      setUsuarios(prev => prev.filter(u => u.id_persona !== id));
      alert("Usuario y persona eliminados correctamente ✅");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el usuario o la persona ❌");
    }
  };

  return (
    <div className="pg-usuarios">
      <div className="menu-container">
        <Menu />
      </div>

      <div className="container-body-usuarios">
        <h1>Usuarios</h1>
        <button className="btn-agregar"  onClick={() => navegar("/registroUsuarios")}>Crear usuario</button>
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de Usuario</th>
              <th>Contraseña</th>
              <th>Fecha de Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id_persona}>
                <td>{usuario.id_persona}</td>
                <td>{usuario.nombre_usuario}</td>
                <td>{usuario.contraseña}</td>
                <td>{usuario.fecha_registro}</td>
                <td className="acciones-usuarios">
                  <button
                    className="btn-editar"
                    onClick={() => navegar(`/editarUsuarios/${usuario.id_persona}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarUsuario(usuario.id_persona)}
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
