import Plot from './PlotWrapper'

const BASE = {
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor:  '#FAFAFA',
  font: { family: 'Inter, system-ui, sans-serif', size: 11, color: '#374151' },
  hoverlabel: { bgcolor: '#1F2937', font: { color: '#F9FAFB', size: 12 } },
}

function gradientNavy(n) {
  return Array.from({ length: n }, (_, i) =>
    `rgba(0,51,102,${(1 - i / (n || 1) * 0.6).toFixed(2)})`
  )
}
function gradientTeal(n) {
  return Array.from({ length: n }, (_, i) =>
    `rgba(23,116,138,${(1 - i / (n || 1) * 0.6).toFixed(2)})`
  )
}

export default function GeoSection({ data }) {
  const { por_region, por_ciudad } = data

  const regPairs = por_region.labels
    .map((l, i) => ({ l, v: por_region.values[i] }))
    .sort((a, b) => b.v - a.v)

  const ciuPairs = por_ciudad.labels
    .map((l, i) => ({ l, v: por_ciudad.values[i] }))
    .sort((a, b) => b.v - a.v)

  const topReg = regPairs[0]?.l ?? '—'
  const topCiu = ciuPairs[0]?.l ?? '—'

  return (
    <section id="geografia" className="section">
      <div className="section-header">
        <h2 className="section-title">Distribución Geográfica</h2>
        <span className="section-sub">
          {topReg} lidera por ingresos · {regPairs.length} regiones activas
        </span>
      </div>

      <div className="charts-2col">
        <div className="chart-card">
          <div className="chart-title">Ingresos por Región</div>
          <p className="chart-insight">
            {topReg} concentra el mayor volumen de ventas del país
          </p>
          <Plot
            data={[{
              type: 'bar',
              x: regPairs.map(p => p.v),
              y: regPairs.map(p => p.l),
              orientation: 'h',
              marker: { color: gradientNavy(regPairs.length) },
              text: regPairs.map(p => `S/ ${(p.v / 1000).toFixed(1)}k`),
              textposition: 'outside',
              textfont: { size: 10 },
              hovertemplate: '<b>%{y}</b><br>S/ %{x:,.0f}<extra></extra>',
              cliponaxis: false,
            }]}
            layout={{
              ...BASE,
              margin: { l: 125, r: 80, t: 8, b: 40 },
              xaxis: {
                tickprefix: 'S/ ', tickformat: ',.0f',
                gridcolor: '#F3F4F6', zeroline: false,
              },
              yaxis: { autorange: 'reversed' },
              height: 340,
            }}
            config={{ responsive: true, displayModeBar: false }}
            style={{ width: '100%' }}
          />
        </div>

        <div className="chart-card">
          <div className="chart-title">Top 10 Ciudades por Ingresos</div>
          <p className="chart-insight">
            {topCiu} encabeza el ranking de ciudades con mayor facturación
          </p>
          <Plot
            data={[{
              type: 'bar',
              x: ciuPairs.map(p => p.v),
              y: ciuPairs.map(p => p.l),
              orientation: 'h',
              marker: { color: gradientTeal(ciuPairs.length) },
              text: ciuPairs.map(p => `S/ ${(p.v / 1000).toFixed(1)}k`),
              textposition: 'outside',
              textfont: { size: 10 },
              hovertemplate: '<b>%{y}</b><br>S/ %{x:,.0f}<extra></extra>',
              cliponaxis: false,
            }]}
            layout={{
              ...BASE,
              margin: { l: 125, r: 80, t: 8, b: 40 },
              xaxis: {
                tickprefix: 'S/ ', tickformat: ',.0f',
                gridcolor: '#F3F4F6', zeroline: false,
              },
              yaxis: { autorange: 'reversed' },
              height: 340,
            }}
            config={{ responsive: true, displayModeBar: false }}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </section>
  )
}
