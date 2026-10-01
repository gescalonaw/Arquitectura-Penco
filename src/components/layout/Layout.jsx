import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()

  // Scroll al top en cada cambio de ruta
// Scroll al top en cada cambio de ruta
  useEffect(() => {
    // 1. Desactivamos la memoria de scroll nativa del navegador
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // 2. Usamos setTimeout para esperar a que React termine de "pintar" la nueva página 
    // antes de forzar el scroll hacia arriba.
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' 
      })
    }, 0)
  }, [pathname])

  const isHome = pathname === '/'

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bone)]">
      <Header />
      {/* En Home el hero empieza desde el top (header transparente).
          En otras páginas dejamos espacio para que no quede tapado. */}
      <main className={`flex-1 ${isHome ? '' : 'pt-[84px]'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
