export default function VoltarisWebsite() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold shadow-lg shadow-blue-900/30">
              ⚡
            </div>
            <div>
              <div className="text-xl font-semibold tracking-wide">VOLTARIS</div>
              <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Electrical Engineering</div>
            </div>
          </div>
          <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
            <a href="#servicios" className="transition hover:text-white">Servicios</a>
            <a href="#nosotros" className="transition hover:text-white">Nosotros</a>
            <a href="#sectores" className="transition hover:text-white">Sectores</a>
            <a href="#contacto" className="transition hover:text-white">Contacto</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25),transparent_35%)]" />
          <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:grid-cols-2 md:py-32">
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-200">
                Ingeniería eléctrica • Energía • Electromovilidad
              </div>
              <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
                Soluciones eléctricas modernas para proyectos con visión.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Voltaris desarrolla servicios de ingeniería eléctrica, generación distribuida, automatización, mantenimiento técnico y comercialización de equipos para clientes residenciales, comerciales e industriales.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#contacto"
                  className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-500"
                >
                  Solicitar cotización
                </a>
                <a
                  href="#servicios"
                  className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/5"
                >
                  Ver servicios
                </a>
              </div>
            </div>

            <div className="relative z-10">
              <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/30 backdrop-blur">
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-900 p-6">
                  <div className="text-sm text-slate-400">Áreas de especialidad</div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {[
                      'Ingeniería eléctrica',
                      'Generación distribuida',
                      'Electromovilidad',
                      'Automatización industrial',
                      'Instalaciones eléctricas',
                      'Venta de equipos y repuestos',
                    ].map((item) => (
                      <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-slate-200">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    ['Proyectos', 'Diseño y ejecución técnica'],
                    ['Soporte', 'Mantenimiento y reparación'],
                    ['Comercial', 'Equipos eléctricos y soluciones'],
                  ].map(([title, desc]) => (
                    <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                      <div className="text-sm font-medium text-white">{title}</div>
                      <div className="mt-2 text-sm leading-6 text-slate-400">{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="servicios" className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12 max-w-2xl">
            <div className="text-sm uppercase tracking-[0.3em] text-blue-300">Servicios</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Una plataforma técnica para energía, industria y movilidad eléctrica.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: 'Ingeniería eléctrica',
                text: 'Diseño, cálculo, revisión y desarrollo de proyectos eléctricos para aplicaciones residenciales, comerciales e industriales.',
              },
              {
                title: 'Generación distribuida',
                text: 'Soluciones fotovoltaicas, evaluación técnica, dimensionamiento e integración de sistemas conectados a red.',
              },
              {
                title: 'Automatización industrial',
                text: 'Implementación de sistemas de control, tableros, instrumentación y soluciones orientadas a eficiencia operativa.',
              },
              {
                title: 'Electromovilidad',
                text: 'Asesoramiento, equipos, repuestos y servicios relacionados con scooters, motos y soluciones de movilidad eléctrica.',
              },
              {
                title: 'Instalación y mantenimiento',
                text: 'Montaje de sistemas eléctricos, mantenimiento preventivo y correctivo, soporte técnico y reparación de equipos.',
              },
              {
                title: 'Comercialización e importación',
                text: 'Venta de equipos eléctricos, accesorios, repuestos y soluciones técnicas para proyectos de energía y electrificación.',
              },
            ].map((service) => (
              <div key={service.title} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.05]">
                <div className="mb-4 h-12 w-12 rounded-2xl bg-blue-600/15" />
                <h3 className="text-xl font-medium text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{service.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="nosotros" className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-blue-300">Nosotros</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Voltaris nace para conectar ingeniería, energía y soluciones reales.</h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
                Nuestra propuesta integra conocimiento técnico, visión comercial y enfoque en innovación para acompañar proyectos eléctricos, energéticos y de electromovilidad con una identidad moderna, confiable y especializada.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                ['Enfoque', 'Soluciones aplicables y técnicamente sólidas.'],
                ['Cobertura', 'Servicios para clientes residenciales, comerciales e industriales.'],
                ['Visión', 'Impulsar electrificación inteligente y energía sostenible.'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5">
                  <div className="text-sm font-medium text-white">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-400">{text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="sectores" className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12 max-w-2xl">
            <div className="text-sm uppercase tracking-[0.3em] text-blue-300">Sectores</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Experiencia orientada a diferentes entornos de aplicación.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {['Residencial', 'Comercial', 'Industrial', 'Movilidad eléctrica'].map((sector) => (
              <div key={sector} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center text-lg font-medium text-slate-100">
                {sector}
              </div>
            ))}
          </div>
        </section>

        <section id="contacto" className="border-t border-white/10 bg-slate-900">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[1fr_1fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-blue-300">Contacto</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Conversemos sobre tu próximo proyecto.</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
                Puedes usar este espacio para añadir tus datos de contacto reales, dirección, WhatsApp, correo corporativo y redes sociales de Voltaris.
              </p>
              <div className="mt-8 grid gap-4 text-sm text-slate-300">
                <div>Correo: contacto@voltaris.com</div>
                <div>Teléfono: +591 000 00000</div>
                <div>Ubicación: Bolivia</div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
              <div className="grid gap-4">
                <input className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-500" placeholder="Nombre" />
                <input className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-500" placeholder="Correo electrónico" />
                <input className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-500" placeholder="Asunto" />
                <textarea className="min-h-[140px] rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-500" placeholder="Cuéntanos sobre tu proyecto" />
                <button className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-500">
                  Enviar mensaje
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>© 2026 Voltaris. Todos los derechos reservados.</div>
          <div>Electrical Engineering · Energy Solutions · Electromobility</div>
        </div>
      </footer>
    </div>
  );
}
