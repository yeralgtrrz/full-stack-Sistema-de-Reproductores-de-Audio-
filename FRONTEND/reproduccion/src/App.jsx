import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistroUsuarios from './pages/registroUsuarios.jsx';
import RegistroArtistas from './pages/registroArtistas.jsx';
import EditarUsuarios from './pages/editarUsuarios.jsx';
import EditarAudios from './pages/editarAudios.jsx';
import EditarAlbums from './pages/editarAlbums.jsx';
import Principal from './pages/principal.jsx';
import Usuarios from './pages/usuarios.jsx';
import Artistas from './pages/artistas.jsx';
import Album from './pages/album.jsx';
import RegistroAlbums from './pages/registroAlbums.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path='/albums' element={<Album/>}/>
        <Route path='/usuarios' element={<Usuarios/>}/>
        <Route path='/artistas' element={<Artistas/>}/>
        <Route path="/editarAlbums/:id" element={<EditarAlbums />} />
        <Route path="/editarAudios/:id" element={<EditarAudios />} />
        <Route path="/registroArtistas" element={<RegistroArtistas />} />
        <Route path="/registroUsuarios" element={<RegistroUsuarios />} />
        <Route path="/registroAlbums" element={<RegistroAlbums />} />
        <Route path="/editarUsuarios/:id" element={<EditarUsuarios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;