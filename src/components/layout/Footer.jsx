import { Link } from 'react-router-dom'
import logoFondart from '../../assets/logos/FONDOS_versionDIGITAL-04.png'
import logoCineclub from '../../assets/logos/LOGO_CINEMATOGRÁFICO (blanco).png'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-bone)]/80 ">
      <div className="max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14 py-20 md:py-28">
        {/* Bloque superior — gran cita / identidad */}
        <div className="grid grid-cols-12 gap-8 mb-20">
          <div className="col-span-12 md:col-span-8">
            <div className="section-number text-[var(--color-penco-gold)] mb-4">
              · ARQUITECTURA DE PENCO ·
            </div>
            <p className="font-display text-3xl md:text-5xl text-white leading-[1.05] max-w-3xl">
              Un archivo vivo del patrimonio industrial pencón
              <span className="text-[var(--color-penco-gold)]">.</span>
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col justify-end gap-3">
            <Link to="/contacto" className="btn-primary self-start" style={{ background: 'white', color: 'var(--color-ink)', borderColor: 'white' }}>
              Escríbenos
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Grilla de enlaces */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16 border-t border-white/10 pt-12">
          <div>
            <h4 className="section-number text-white/60 mb-4">Proyecto</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/proyecto" className="hover:text-[var(--color-penco-gold)] transition-colors">Sobre el proyecto</Link></li>
              <li><Link to="/proyecto#equipo" className="hover:text-[var(--color-penco-gold)] transition-colors">Equipo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="section-number text-white/60 mb-4">Barrios</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/barrios/crav" className="hover:text-[var(--color-penco-gold)] transition-colors">CRAV</Link></li>
              <li><Link to="/barrios/vipla" className="hover:text-[var(--color-penco-gold)] transition-colors">VIPLA</Link></li>
              <li><Link to="/barrios/fanaloza" className="hover:text-[var(--color-penco-gold)] transition-colors">FANALOZA</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="section-number text-white/60 mb-4">Multimedia</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/mapa" className="hover:text-[var(--color-penco-gold)] transition-colors">Mapa</Link></li>
              <li><Link to="/videos" className="hover:text-[var(--color-penco-gold)] transition-colors">Videos</Link></li>
              <li><Link to="/publicaciones" className="hover:text-[var(--color-penco-gold)] transition-colors">Publicaciones</Link></li>
              <li><Link to="/maquetas-3d" className="hover:text-[var(--color-penco-gold)] transition-colors">Maquetas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="section-number text-white/60 mb-2">Financiado por</h4>
            <p className="text-sm leading-relaxed">
             Fondo Nacional de Desarrollo Cultural y las Artes (FONDART), Línea de Difusión.
            </p>
            <h4 className="section-number text-white/60 mb-2 mt-6">Proyecto de</h4>
            <a href="https://www.instagram.com/cineclubpenco/" target="_blank" rel="noopener noreferrer" className="text-sm mt-2 hover:text-[var(--color-penco-gold)] transition-colors">
            Centro Cinematográfico de Penco</a>
          </div>
        </div>

        {/* Logos institucionales */}
        <div className="flex flex-wrap items-center gap-8 py-10 border-t border-white/10">
          <img src={logoFondart} alt="Fondart" className="h-20 object-contain opacity-90" />
          <img src={logoCineclub} alt="Cineclub Penco" className="h-20 object-contain opacity-90" />
        </div>

        {/* Línea inferior */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 border-t border-white/10 text-xs">
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} Arquitectura de Penco</span>
            <span className="text-white/30 hidden md:inline">·</span>
            <span className="text-white/50">arquitecturapenco.cl</span>
          </div>
          <a
            href="https://www.instagram.com/arquitecturapenco/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/50 hover:text-[var(--color-penco-gold)] transition-colors"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="18" height="18" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
            </svg>
            @arquitecturapenco
          </a>
        </div>
      </div>
    </footer>
  )
}
