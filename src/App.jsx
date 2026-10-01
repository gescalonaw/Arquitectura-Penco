import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Proyecto from './pages/Proyecto'
import CRAV from './pages/barrios/CRAV'
import VIPLA from './pages/barrios/VIPLA'
import Fanaloza from './pages/barrios/Fanaloza'
import Mapa from './pages/Mapa'
import Videos from './pages/Videos'
import Publicaciones from './pages/Publicaciones'
import Maquetas3D from './pages/Maquetas3D'
import Contacto from './pages/Contacto'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/proyecto" element={<Proyecto />} />
        <Route path="/barrios/crav" element={<CRAV />} />
        <Route path="/barrios/vipla" element={<VIPLA />} />
        <Route path="/barrios/fanaloza" element={<Fanaloza />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/publicaciones" element={<Publicaciones />} />
        <Route path="/maquetas-3d" element={<Maquetas3D />} />
        <Route path="/contacto" element={<Contacto />} />
      </Route>
    </Routes>
  )
}

export default App
