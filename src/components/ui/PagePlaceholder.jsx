export default function PagePlaceholder({ titulo, descripcion, numero = '01', children }) {
  return (
    <div className="max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14 py-20 md:py-28">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-8">
          <div className="eyebrow text-[var(--color-penco-blue-600)] mb-6">
            <span>Sección</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-[var(--color-ink)] mb-8">
            {titulo}
          </h1>
          {descripcion && (
            <p className="text-lg md:text-xl leading-relaxed text-[var(--color-mute)] max-w-2xl">
              {descripcion}
            </p>
          )}
        </div>
      </div>

      {children && <div className="mt-16">{children}</div>}
      <div className="mt-20 p-8 md:p-10 bg-[var(--color-paper)] rounded-2xl border border-[var(--color-penco-blue-200)]/40">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-penco-gold)]/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-[var(--color-penco-gold-deep)]" viewBox="0 0 20 20" fill="none">
              <path d="M10 2v4M10 14v4M2 10h4M14 10h4M4.5 4.5l2.8 2.8M12.7 12.7l2.8 2.8M4.5 15.5l2.8-2.8M12.7 7.3l2.8-2.8"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="section-number text-[var(--color-penco-gold-deep)] mb-1">En desarrollo</div>
            <p className="text-sm text-[var(--color-ink-soft)]">
              Esta sección está en construcción — el contenido se desarrolla en
              los próximos pasos del proyecto.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
