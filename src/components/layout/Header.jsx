import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navegacion } from '../../data/barrios'
import { useScrolled } from '../../hooks/useScrollReveal'
import logo from "../../assets/logos/Logo_Blanco.png";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = useScrolled(40)
  const location = useLocation()

  const isHome = location.pathname === '/'

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [location.pathname])

  const menus = [
    { id: 'proyecto', label: 'Proyecto', items: navegacion.proyecto },
    { id: 'barrios', label: 'Barrios', items: navegacion.barrios },
    { id: 'multimedia', label: 'Multimedia', items: navegacion.multimedia },
  ]

  // Estilos del header según contexto
  const headerBase = 'fixed top-0 inset-x-0 z-50 transition-all duration-500'
  const headerStyle = scrolled
    ? 'bg-[rgba(104,116,182,0.95)] text-white'
    : 'bg-[#6874b6] text-white'

  return (
    <header
      className={`${headerBase} ${headerStyle}`}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="flex items-center justify-between h-[72px] md:h-[84px]">
          {/* === LOGO === */}


{/* === LOGO === */}
<Link
  to="/"
  className="flex items-center gap-3 group"
  aria-label="Arquitectura de Penco — Inicio"
>
  <img
    src={logo}
    alt="Arquitectura de Penco"
    className="h-12 w-auto object-contain"
  />
</Link>

          {/* === NAV DESKTOP === */}
          <nav className="hidden md:flex items-center gap-1">
            {menus.map((menu) => (
              <button
                key={menu.id}
                onMouseEnter={() => setOpenMenu(menu.id)}
                onClick={() => setOpenMenu(openMenu === menu.id ? null : menu.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-opacity hover:opacity-100 ${
                  openMenu === menu.id ? 'opacity-100' : 'opacity-75'
                }`}
                aria-expanded={openMenu === menu.id}
              >
                {menu.label}
                <svg
                  className={`inline-block ml-1.5 w-3 h-3 transition-transform duration-300 ${
                    openMenu === menu.id ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 12 12" fill="none"
                >
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            ))}

            <NavLink
              to="/contacto"
              className={({ isActive }) =>
                `ml-3 px-4 py-2 text-sm font-medium transition-opacity ${
                  isActive ? 'opacity-100' : 'opacity-75 hover:opacity-100'
                }`
              }
            >
              Contacto
            </NavLink>
          </nav>

          {/* === BOTÓN MOBILE === */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center"
            aria-label="Abrir menú"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`block w-5 h-px bg-current transition-transform duration-300 ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`block w-5 h-px bg-current transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-px bg-current transition-transform duration-300 ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* === DROPDOWN DESKTOP === */}
      <div
        className={`hidden md:block absolute left-0 right-0 top-full overflow-hidden transition-all duration-500 ${
          openMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          maxHeight: openMenu ? '500px' : '0px',
        }}
      >
        <div className="glass border-t border-[var(--color-ink)]/8">
          <div className="max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14 py-10">
            {menus.map((menu) => (
              <div
                key={menu.id}
                className={`grid grid-cols-12 gap-8 transition-all duration-500 ${
                  openMenu === menu.id ? 'opacity-100' : 'hidden opacity-0'
                }`}
                onMouseEnter={() => setOpenMenu(menu.id)}
              >
                <div className="col-span-3">
                  <div className="section-number text-[var(--color-mute)] mb-2">
                    {String(menus.findIndex((m) => m.id === menu.id) + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-display text-3xl text-[var(--color-ink)]">
                    {menu.label}
                  </h3>
                </div>
                <ul className="col-span-9 grid grid-cols-2 gap-x-12 gap-y-1">
                  {menu.items.map((item, idx) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="group flex items-center justify-between py-3 border-b border-[var(--color-ink)]/8 text-[var(--color-ink)] hover:text-[var(--color-penco-gold-deep)] transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <span className="section-number">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-sm font-medium">{item.label}</span>
                        </span>
                        <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" viewBox="0 0 16 16" fill="none">
                          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === MENÚ MOBILE === */}
      <div
        className={`md:hidden fixed inset-x-0 top-[72px] bottom-0 glass overflow-y-auto transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-6 py-8 space-y-8">
          {menus.map((menu) => (
            <div key={menu.id}>
              <div className="section-number text-[var(--color-mute)] mb-3">
                {menu.label}
              </div>
              <ul className="space-y-1">
                {menu.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="flex items-center justify-between py-3 border-b border-[var(--color-ink)]/10 text-[var(--color-ink)]"
                    >
                      <span className="font-display text-2xl">{item.label}</span>
                      <span className="text-[var(--color-mute)]">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link
            to="/contacto"
            className="btn-primary w-full justify-center"
          >
            Contacto →
          </Link>
        </div>
      </div>
    </header>
  )
}
