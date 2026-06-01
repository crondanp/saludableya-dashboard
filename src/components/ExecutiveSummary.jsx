export default function ExecutiveSummary({ data }) {
  const { kpis, ventas, geo, clientes } = data

  const fmtS   = (n) => `S/ ${Math.round(n || 0).toLocaleString('es-PE')}`
  const fmtN   = (n) => Math.round(n || 0).toLocaleString('es-PE')
  const fmtPct = (n) => `${(n || 0).toFixed(1)}%`

  const topRegIdx = geo.por_region.values.indexOf(
    Math.max(...(geo.por_region.values.length ? geo.por_region.values : [0]))
  )
  const topReg  = geo.por_region.labels[topRegIdx] || '—'
  const nReg    = geo.por_region.labels.length
  const pareto80 = ventas.estadisticas?.productos_80pct ?? '—'
  const topProd  = ventas.estadisticas?.producto_top    ?? '—'
  const topCat   = ventas.estadisticas?.categoria_top   ?? '—'
  const corr     = (clientes.correlacion || 0).toFixed(2)
  const cal      = (kpis.calificacion_promedio || 0).toFixed(2)

  const cards = [
    {
      tag:      'Resultados Generales',
      headline: `${fmtS(kpis.total_ventas)} en ingresos totales`,
      support:  `${fmtN(kpis.total_pedidos)} pedidos procesados`,
      metric:   `Ticket promedio ${fmtS(kpis.ticket_promedio)} · Recompra ${fmtPct(kpis.tasa_recompra_pct)}`,
      color:    'var(--c-navy)',
    },
    {
      tag:      'Portafolio de Productos',
      headline: `${topProd} lidera las ventas`,
      support:  `Categoría estrella: ${topCat}`,
      metric:   `Solo ${pareto80} productos concentran el 80% de ingresos`,
      color:    'var(--c-pos)',
    },
    {
      tag:      'Experiencia del Cliente',
      headline: 'El tiempo de entrega impacta la calificación',
      support:  `Correlación r = ${corr} entre entrega y satisfacción`,
      metric:   `Calificación promedio: ${cal} / 5 — optimizar logística`,
      color:    'var(--c-neg)',
    },
    {
      tag:      'Alcance Geográfico',
      headline: `${topReg} lidera el mercado`,
      support:  `${nReg} regiones activas en el país`,
      metric:   'Concentración en mercados urbanos — oportunidad de expansión',
      color:    'var(--c-blue)',
    },
  ]

  return (
    <section className="exec-section">
      <div className="exec-section-label">Hallazgos Clave</div>
      <div className="exec-grid">
        {cards.map((c, i) => (
          <div key={i} className="exec-card" style={{ '--exec-color': c.color }}>
            <div className="exec-tag">{c.tag}</div>
            <div className="exec-headline">{c.headline}</div>
            <div className="exec-support">{c.support}</div>
            <div className="exec-metric">{c.metric}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
