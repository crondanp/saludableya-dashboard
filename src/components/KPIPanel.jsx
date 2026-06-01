export default function KPIPanel({ kpis }) {
  const cards = [
    {
      icon:  '💰',
      value: `S/ ${Math.round(kpis.total_ventas || 0).toLocaleString('es-PE')}`,
      label: 'Ingresos Totales',
      ctx:   `${Math.round(kpis.total_pedidos || 0).toLocaleString('es-PE')} pedidos`,
      color: 'var(--c-navy)',
    },
    {
      icon:  '🧾',
      value: `S/ ${(kpis.ticket_promedio || 0).toFixed(2)}`,
      label: 'Ticket Promedio',
      ctx:   'por pedido',
      color: 'var(--c-navy-lt)',
    },
    {
      icon:  '📦',
      value: `${Math.round(kpis.total_pedidos || 0).toLocaleString('es-PE')}`,
      label: 'Pedidos Totales',
      ctx:   'registros analizados',
      color: 'var(--c-teal)',
    },
    {
      icon:  '⭐',
      value: `${(kpis.calificacion_promedio || 0).toFixed(2)} / 5`,
      label: 'Calificación',
      ctx:   'satisfacción del cliente',
      color: 'var(--c-pos)',
    },
    {
      icon:  '🚚',
      value: `${(kpis.tiempo_entrega_prom_min || 0).toFixed(1)} min`,
      label: 'Entrega Promedio',
      ctx:   'por pedido',
      color: 'var(--c-warn)',
    },
    {
      icon:  '🔁',
      value: `${(kpis.tasa_recompra_pct || 0).toFixed(1)}%`,
      label: 'Tasa de Recompra',
      ctx:   'clientes recurrentes',
      color: 'var(--c-neg)',
    },
  ]

  return (
    <section id="kpis" className="section" style={{ marginTop: '1rem' }}>
      <div className="section-header">
        <h2 className="section-title">Indicadores de Desempeño</h2>
        <span className="section-sub">Vista consolidada del período analizado</span>
      </div>
      <div className="kpi-grid">
        {cards.map((c, i) => (
          <div key={i} className="kpi-card" style={{ '--kpi-color': c.color }}>
            <span className="kpi-icon">{c.icon}</span>
            <div className="kpi-value">{c.value}</div>
            <div className="kpi-label">{c.label}</div>
            <div className="kpi-ctx">{c.ctx}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
