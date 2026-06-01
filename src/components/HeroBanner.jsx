export default function HeroBanner({ kpis }) {
  const fmt = (n) => `S/ ${Math.round(n || 0).toLocaleString('es-PE')}`
  const fmtN = (n) => Math.round(n || 0).toLocaleString('es-PE')

  return (
    <div className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-eyebrow">Proyecto · Introducción a Data Science · 2026</div>
          <h1 className="hero-title">
            SaludableYa<br />
            <span>Análisis Comercial</span>
          </h1>
          <p className="hero-subtitle">
            Pipeline de datos completo: ingesta, limpieza, análisis multivariable,
            segmentación de clientes y visualización interactiva.
          </p>
          <div className="hero-kpis">
            <div className="hero-kpi">
              <div className="hero-kpi-value">{fmt(kpis?.total_ventas)}</div>
              <div className="hero-kpi-label">Ingresos Totales</div>
            </div>
            <div className="hero-kpi">
              <div className="hero-kpi-value">{fmtN(kpis?.total_pedidos)}</div>
              <div className="hero-kpi-label">Pedidos</div>
            </div>
            <div className="hero-kpi">
              <div className="hero-kpi-value">{(kpis?.calificacion_promedio || 0).toFixed(2)}</div>
              <div className="hero-kpi-label">Calificación / 5</div>
            </div>
            <div className="hero-kpi">
              <div className="hero-kpi-value">{(kpis?.tasa_recompra_pct || 0).toFixed(1)}%</div>
              <div className="hero-kpi-label">Recompra</div>
            </div>
          </div>
        </div>
        <div className="hero-badge-wrap">
          <span className="hero-live">Dashboard en vivo</span>
          <div className="hero-tech">
            React 18 + Vite 5 + Plotly.js<br />
            GitHub Actions · GitHub Pages<br />
            Python · pandas · scikit-learn
          </div>
        </div>
      </div>
    </div>
  )
}
