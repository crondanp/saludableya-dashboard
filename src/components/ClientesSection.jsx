import Plot from './PlotWrapper'

const BASE = {
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor:  '#FAFAFA',
  font: { family: 'Inter, system-ui, sans-serif', size: 11, color: '#374151' },
  hoverlabel: { bgcolor: '#1F2937', font: { color: '#F9FAFB', size: 12 } },
}

const NIVEL_COLOR = { 'Alta': '#1A7A4A', 'Media': '#B45309', 'Baja': '#B91C2D' }
const PIE_COLORS  = [
  '#CBD5E0', '#B91C2D', '#17748A', '#B45309',
  '#003366', '#1A7A4A', '#1B4F8E',
]

export default function ClientesSection({ data }) {
  const { correlacion, satisfaccion_entrega, quejas, valoracion } = data
  const corr     = (correlacion || 0).toFixed(2)
  const maxT     = Math.max(...(satisfaccion_entrega.tiempos.length ? satisfaccion_entrega.tiempos : [80]))
  const topQueja = quejas.labels[1] ?? quejas.labels[0] ?? '—'

  return (
    <section id="clientes" className="section">
      <div className="section-header">
        <h2 className="section-title">Experiencia y Satisfacción del Cliente</h2>
        <span className="section-sub">
          Correlación entrega–calificación: r = {corr}
        </span>
      </div>

      <div className="charts-2col">
        <div className="chart-card">
          <div className="chart-title">Tiempo de Entrega por Nivel de Satisfacción</div>
          <p className="chart-insight">
            Los clientes con satisfacción Baja reciben pedidos más tarde en promedio
          </p>
          <Plot
            data={[{
              type: 'bar',
              x: satisfaccion_entrega.niveles,
              y: satisfaccion_entrega.tiempos,
              marker: {
                color: satisfaccion_entrega.niveles.map(n => NIVEL_COLOR[n] || '#003366'),
              },
              text: satisfaccion_entrega.tiempos.map(t => `${t.toFixed(1)} min`),
              textposition: 'outside',
              textfont: { size: 11 },
              hovertemplate: '<b>%{x}</b><br>%{y:.1f} min<extra></extra>',
            }]}
            layout={{
              ...BASE,
              margin: { l: 65, r: 30, t: 8, b: 55 },
              yaxis: {
                title: { text: 'Minutos promedio', font: { size: 11 } },
                ticksuffix: ' min',
                range: [0, maxT * 1.22],
                gridcolor: '#F3F4F6',
              },
              height: 300,
            }}
            config={{ responsive: true, displayModeBar: false }}
            style={{ width: '100%' }}
          />
        </div>

        <div className="chart-card">
          <div className="chart-title">Clasificación de Quejas Registradas</div>
          <p className="chart-insight">
            {topQueja} es el principal motivo de insatisfacción identificado
          </p>
          <Plot
            data={[{
              type: 'pie',
              labels: quejas.labels,
              values: quejas.counts,
              hole: 0.45,
              marker: { colors: PIE_COLORS },
              hovertemplate: '<b>%{label}</b><br>%{value} casos — %{percent}<extra></extra>',
              textinfo: 'label+percent',
              textfont: { size: 10 },
              pull: quejas.labels.map((_, i) => i === 1 ? 0.05 : 0),
            }]}
            layout={{
              ...BASE,
              margin: { l: 10, r: 10, t: 8, b: 10 },
              showlegend: false,
              height: 300,
            }}
            config={{ responsive: true, displayModeBar: false }}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {valoracion.productos.length > 0 && (
        <div className="chart-card">
          <div className="chart-title">Calificación Promedio por Producto</div>
          <p className="chart-insight">
            Productos por encima de 4.0 cumplen el estándar mínimo de calidad percibida
          </p>
          <Plot
            data={[{
              type: 'bar',
              x: valoracion.productos,
              y: valoracion.puntuaciones,
              marker: {
                color: valoracion.puntuaciones.map(v =>
                  v >= 4.2 ? '#1A7A4A' : v >= 3.8 ? '#B45309' : '#B91C2D'
                ),
              },
              text: valoracion.puntuaciones.map(v => v.toFixed(2)),
              textposition: 'outside',
              textfont: { size: 10 },
              hovertemplate: '<b>%{x}</b><br>%{y:.2f} / 5<extra></extra>',
            }]}
            layout={{
              ...BASE,
              margin: { l: 55, r: 30, t: 8, b: 135 },
              xaxis: { tickangle: -38, tickfont: { size: 10 }, gridcolor: '#F3F4F6' },
              yaxis: {
                title: { text: 'Calificación (1–5)', font: { size: 11 } },
                range: [0, 5.6],
                gridcolor: '#F3F4F6',
              },
              shapes: [{
                type: 'line',
                x0: -0.5, x1: valoracion.productos.length - 0.5,
                y0: 4.0, y1: 4.0,
                line: { color: '#1A7A4A', width: 1.5, dash: 'dot' },
              }],
              annotations: [{
                x: valoracion.productos.length * 0.84, y: 4.2,
                text: 'Estándar 4.0',
                showarrow: false,
                font: { color: '#1A7A4A', size: 10 },
              }],
              height: 360,
            }}
            config={{ responsive: true, displayModeBar: false }}
            style={{ width: '100%' }}
          />
        </div>
      )}
    </section>
  )
}
