import Plot from './PlotWrapper'

const NAVY    = '#003366'
const BLUE    = '#1B4F8E'
const TEAL    = '#17748A'
const CAT_PAL = ['#003366','#1B4F8E','#17748A','#2B6CB0','#4A90D9',
                 '#276749','#B45309','#B91C2D','#6B7280','#90CDF4']

const BASE = {
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor:  '#FAFAFA',
  font: { family: 'Inter, system-ui, sans-serif', size: 11, color: '#374151' },
  hoverlabel: { bgcolor: '#1F2937', font: { color: '#F9FAFB', size: 12 } },
}

export default function VentasSection({ data }) {
  const { estadisticas, por_producto, por_categoria, pareto } = data

  const topN  = 10
  const pairs = por_producto.labels
    .map((l, i) => ({ l, v: por_producto.values[i] }))
    .sort((a, b) => b.v - a.v)
    .slice(0, topN)

  const threshold80 = pareto.pct_acum.findIndex(p => p >= 80)
  const nPareto     = threshold80 === -1 ? pareto.productos.length : threshold80 + 1

  return (
    <section id="ventas" className="section">
      <div className="section-header">
        <h2 className="section-title">Ventas y Portafolio de Productos</h2>
        <span className="section-sub">Análisis de ingresos, mix de productos y concentración</span>
      </div>

      <div className="charts-2col">
        <div className="chart-card">
          <div className="chart-title">Top {topN} Productos por Ingresos</div>
          <p className="chart-insight">
            {estadisticas.producto_top} ocupa la primera posición del portafolio
          </p>
          <Plot
            data={[{
              type: 'bar',
              x: pairs.map(p => p.v),
              y: pairs.map(p => p.l),
              orientation: 'h',
              marker: { color: pairs.map((_, i) => i === 0 ? TEAL : NAVY) },
              text: pairs.map(p => `S/ ${(p.v / 1000).toFixed(1)}k`),
              textposition: 'outside',
              textfont: { size: 10 },
              hovertemplate: '<b>%{y}</b><br>S/ %{x:,.0f}<extra></extra>',
              cliponaxis: false,
            }]}
            layout={{
              ...BASE,
              margin: { l: 185, r: 80, t: 8, b: 40 },
              xaxis: {
                tickprefix: 'S/ ', tickformat: ',.0f',
                gridcolor: '#F3F4F6', gridwidth: 1, zeroline: false,
              },
              yaxis: { autorange: 'reversed' },
              height: 340,
            }}
            config={{ responsive: true, displayModeBar: false }}
            style={{ width: '100%' }}
          />
        </div>

        <div className="chart-card">
          <div className="chart-title">Composición de Ingresos por Categoría</div>
          <p className="chart-insight">
            {estadisticas.categoria_top} concentra la mayor participación en el mix
          </p>
          <Plot
            data={[{
              type: 'pie',
              labels: por_categoria.labels,
              values: por_categoria.values,
              hole: 0.50,
              marker: { colors: CAT_PAL },
              hovertemplate: '<b>%{label}</b><br>S/ %{value:,.0f} — %{percent}<extra></extra>',
              textinfo: 'label+percent',
              textfont: { size: 10 },
              outsidetextfont: { size: 10 },
            }]}
            layout={{
              ...BASE,
              margin: { l: 10, r: 10, t: 8, b: 10 },
              showlegend: false,
              height: 340,
            }}
            config={{ responsive: true, displayModeBar: false }}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {pareto.productos.length > 0 && (
        <div className="chart-card">
          <div className="chart-title">Análisis de Pareto — Concentración de Ingresos</div>
          <p className="chart-insight">
            {nPareto} productos acumulan el 80% de los ingresos totales (regla 80/20)
          </p>
          <Plot
            data={[
              {
                type: 'bar',
                x: pareto.productos,
                y: pareto.ventas,
                name: 'Ingresos (S/)',
                marker: {
                  color: pareto.productos.map((_, i) =>
                    i < nPareto ? NAVY : '#CBD5E0'
                  ),
                },
                hovertemplate: '<b>%{x}</b><br>S/ %{y:,.0f}<extra></extra>',
              },
              {
                type: 'scatter',
                mode: 'lines+markers',
                x: pareto.productos,
                y: pareto.pct_acum,
                name: '% Acumulado',
                yaxis: 'y2',
                line: { color: '#B91C2D', width: 2 },
                marker: { size: 5, color: '#B91C2D', line: { color: '#fff', width: 1.5 } },
                hovertemplate: '%{x}<br>%{y:.1f}%<extra></extra>',
              },
            ]}
            layout={{
              ...BASE,
              margin: { l: 70, r: 70, t: 8, b: 130 },
              xaxis: {
                tickangle: -40, tickfont: { size: 10 },
                gridcolor: '#F3F4F6',
              },
              yaxis: {
                title: { text: 'Ingresos (S/)', font: { size: 11 } },
                tickprefix: 'S/ ', tickformat: ',.0f',
                gridcolor: '#F3F4F6',
              },
              yaxis2: {
                title: { text: '% Acumulado', font: { size: 11 } },
                overlaying: 'y', side: 'right',
                range: [0, 108], ticksuffix: '%',
                showgrid: false,
              },
              legend: { orientation: 'h', y: 1.08, x: 0 },
              shapes: [{
                type: 'line',
                x0: -0.5, x1: pareto.productos.length - 0.5,
                y0: 80, y1: 80, yref: 'y2',
                line: { color: '#B45309', width: 1.5, dash: 'dash' },
              }],
              annotations: [{
                x: Math.floor(pareto.productos.length * 0.6), y: 83, yref: 'y2',
                text: 'Umbral 80%',
                showarrow: false,
                font: { color: '#B45309', size: 10 },
              }],
              height: 390,
            }}
            config={{ responsive: true, displayModeBar: false }}
            style={{ width: '100%' }}
          />
        </div>
      )}
    </section>
  )
}
