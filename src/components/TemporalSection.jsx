import Plot from './PlotWrapper'

const BASE = {
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor:  '#FAFAFA',
  font: { family: 'Inter, system-ui, sans-serif', size: 11, color: '#374151' },
  hoverlabel: { bgcolor: '#1F2937', font: { color: '#F9FAFB', size: 12 } },
}

const TEMP_COLORS = ['#003366','#1B4F8E','#17748A','#2B6CB0','#4A90D9']

export default function TemporalSection({ data }) {
  const { por_dia_semana, por_temporada, mensual } = data

  const maxDiaIdx  = por_dia_semana.ventas.indexOf(Math.max(...(por_dia_semana.ventas.length ? por_dia_semana.ventas : [0])))
  const maxTempIdx = por_temporada.ventas.indexOf(Math.max(...(por_temporada.ventas.length ? por_temporada.ventas : [0])))
  const maxMesIdx  = mensual.ventas.indexOf(Math.max(...(mensual.ventas.length ? mensual.ventas : [0])))

  const maxDia  = por_dia_semana.dias[maxDiaIdx]  ?? '—'
  const maxTemp = por_temporada.temporadas[maxTempIdx] ?? '—'
  const maxMes  = mensual.meses[maxMesIdx]        ?? '—'
  const avg     = mensual.ventas.reduce((a, b) => a + b, 0) / (mensual.ventas.length || 1)

  const PEAK_DAYS = ['Viernes', 'Sábado']
  const dayColors = por_dia_semana.dias.map(d =>
    PEAK_DAYS.includes(d) ? '#17748A' : '#003366'
  )

  return (
    <section id="temporal" className="section">
      <div className="section-header">
        <h2 className="section-title">Patrones Temporales y Estacionalidad</h2>
        <span className="section-sub">
          Día pico: {maxDia} · Temporada: {maxTemp} · Mes óptimo: {maxMes}
        </span>
      </div>

      <div className="charts-2col">
        <div className="chart-card">
          <div className="chart-title">Ingresos por Día de la Semana</div>
          <p className="chart-insight">
            {maxDia} registra la mayor demanda — base para planificación de capacidad
          </p>
          <Plot
            data={[{
              type: 'bar',
              x: por_dia_semana.dias,
              y: por_dia_semana.ventas,
              marker: { color: dayColors },
              text: por_dia_semana.ventas.map(v => `S/ ${(v / 1000).toFixed(1)}k`),
              textposition: 'outside',
              textfont: { size: 10 },
              hovertemplate: '<b>%{x}</b><br>S/ %{y:,.0f}<extra></extra>',
            }]}
            layout={{
              ...BASE,
              margin: { l: 55, r: 30, t: 8, b: 65 },
              yaxis: {
                tickprefix: 'S/ ', tickformat: ',.0f',
                gridcolor: '#F3F4F6', zeroline: false,
              },
              xaxis: { tickangle: -20 },
              height: 310,
            }}
            config={{ responsive: true, displayModeBar: false }}
            style={{ width: '100%' }}
          />
        </div>

        <div className="chart-card">
          <div className="chart-title">Ingresos por Temporada</div>
          <p className="chart-insight">
            {maxTemp} es el período de mayor facturación anual
          </p>
          <Plot
            data={[{
              type: 'bar',
              x: por_temporada.temporadas,
              y: por_temporada.ventas,
              marker: { color: TEMP_COLORS.slice(0, por_temporada.temporadas.length) },
              text: por_temporada.ventas.map(v => `S/ ${(v / 1000).toFixed(1)}k`),
              textposition: 'outside',
              textfont: { size: 10 },
              hovertemplate: '<b>%{x}</b><br>S/ %{y:,.0f}<extra></extra>',
            }]}
            layout={{
              ...BASE,
              margin: { l: 55, r: 30, t: 8, b: 55 },
              yaxis: {
                tickprefix: 'S/ ', tickformat: ',.0f',
                gridcolor: '#F3F4F6', zeroline: false,
              },
              height: 310,
            }}
            config={{ responsive: true, displayModeBar: false }}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-title">Tendencia Mensual de Ingresos</div>
        <p className="chart-insight">
          {maxMes} alcanza el pico máximo del período ·
          Línea punteada = promedio mensual S/ {Math.round(avg).toLocaleString('es-PE')}
        </p>
        <Plot
          data={[
            {
              type: 'scatter',
              mode: 'lines+markers',
              x: mensual.meses,
              y: mensual.ventas,
              name: 'Ingresos mensuales',
              line: { color: '#003366', width: 2.5 },
              marker: {
                size: 7, color: '#003366',
                line: { color: '#ffffff', width: 2 },
              },
              fill: 'tozeroy',
              fillcolor: 'rgba(0,51,102,0.06)',
              hovertemplate: '<b>%{x}</b><br>S/ %{y:,.0f}<extra></extra>',
            },
            {
              type: 'scatter',
              mode: 'lines',
              x: mensual.meses,
              y: mensual.ventas.map(() => avg),
              name: 'Promedio',
              line: { color: '#6B7280', width: 1.5, dash: 'dot' },
              hoverinfo: 'skip',
            },
          ]}
          layout={{
            ...BASE,
            margin: { l: 70, r: 30, t: 8, b: 65 },
            xaxis: {
              tickangle: -28,
              gridcolor: '#F3F4F6',
            },
            yaxis: {
              title: { text: 'Ingresos (S/)', font: { size: 11 } },
              tickprefix: 'S/ ', tickformat: ',.0f',
              gridcolor: '#F3F4F6', zeroline: false,
            },
            legend: { orientation: 'h', y: 1.08, x: 0 },
            height: 320,
          }}
          config={{ responsive: true, displayModeBar: false }}
          style={{ width: '100%' }}
        />
      </div>
    </section>
  )
}
