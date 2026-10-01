export default function Contacto() {
  const correo = 'arquitecturapenco@gmail.com'         // ← reemplazá con el correo real
  const instagram = '@arquitecturapenco'     // ← reemplazá con el usuario real

  return (
    <main className="max-w-[1180px] mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-28">

      {/* HEADER */}
      <div className="grid grid-cols-12 gap-8 mb-16">
        <div className="col-span-12 md:col-span-8">
          <div className="eyebrow text-[var(--color-penco-blue-600)] mb-6">
            <span>Contacto</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)]">
            ¿Tienes alguna
            <br />
            <span className="font-display-italic text-[var(--color-penco-blue-600)]">consulta?</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* TARJETA — CORREO */}
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${correo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white rounded-2xl p-10 border border-[var(--color-penco-blue-200)]/40 hover:border-[var(--color-penco-gold)]/60 transition-all duration-500 shadow-sm hover:shadow-[0_12px_24px_-8px_rgba(21,24,42,0.18)] flex flex-col gap-8"
        >
          <div className="w-14 h-14 rounded-full bg-[var(--color-penco-blue)]/10 flex items-center justify-center group-hover:bg-[var(--color-penco-gold)]/15 transition-colors duration-500">
            <svg className="w-6 h-6 text-[var(--color-penco-blue-600)] group-hover:text-[var(--color-penco-gold-deep)] transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 7l10 7 10-7" />
            </svg>
          </div>

          <div>
            <div className="section-number text-[var(--color-mute)] mb-2">
              Información y consultas
            </div>
            <div className="font-display text-2xl md:text-3xl text-[var(--color-ink)] mb-1 group-hover:text-[var(--color-penco-blue-600)] transition-colors duration-300 break-all">
              {correo}
            </div>
            <p className="text-sm text-[var(--color-mute)] leading-relaxed mt-3">
              Respondemos consultas sobre el proyecto, solicitudes de material
              y colaboraciones institucionales.
            </p>
          </div>

          <div className="mt-auto flex items-center gap-2 text-sm font-medium text-[var(--color-penco-blue-600)] group-hover:text-[var(--color-penco-gold-deep)] transition-colors">
            <span>Enviar correo</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </div>
        </a>

        {/* TARJETA — INSTAGRAM */}
        <a
          href={`https://instagram.com/${instagram.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white rounded-2xl p-10 border border-[var(--color-penco-blue-200)]/40 hover:border-[var(--color-penco-gold)]/60 transition-all duration-500 shadow-sm hover:shadow-[0_12px_24px_-8px_rgba(21,24,42,0.18)] flex flex-col gap-8"
        >
          <div className="w-14 h-14 rounded-full bg-[var(--color-penco-blue)]/10 flex items-center justify-center group-hover:bg-[var(--color-penco-gold)]/15 transition-colors duration-500">
            <svg className="w-6 h-6 text-[var(--color-penco-blue-600)] group-hover:text-[var(--color-penco-gold-deep)] transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </div>

          <div>
            <div className="section-number text-[var(--color-mute)] mb-2">
              Síguenos en Instagram
            </div>
            <div className="font-display text-2xl md:text-3xl text-[var(--color-ink)] mb-1 group-hover:text-[var(--color-penco-blue-600)] transition-colors duration-300">
              {instagram}
            </div>
            <p className="text-sm text-[var(--color-mute)] leading-relaxed mt-3">
              Publicamos avances del proyecto, fotografías de los barrios
              y novedades sobre el archivo patrimonial.
            </p>
          </div>

          <div className="mt-auto flex items-center gap-2 text-sm font-medium text-[var(--color-penco-blue-600)] group-hover:text-[var(--color-penco-gold-deep)] transition-colors">
            <span>Ver perfil</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </div>
        </a>

      </div>


    </main>
  )
}