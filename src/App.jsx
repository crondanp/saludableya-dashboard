import { useState } from 'react'
import data from './data/dashboard_data.json'
import Header from './components/Header'
import ExecutiveSummary from './components/ExecutiveSummary'
import KPIPanel from './components/KPIPanel'
import VentasSection from './components/VentasSection'
import GeoSection from './components/GeoSection'
import ClientesSection from './components/ClientesSection'
import TemporalSection from './components/TemporalSection'
import Footer from './components/Footer'
import './App.css'

const TABS = [
  { id: 'resumen',   label: 'Resumen Ejecutivo' },
  { id: 'ventas',    label: 'Ventas & Portafolio' },
  { id: 'geo',       label: 'Geografía' },
  { id: 'clientes',  label: 'Clientes' },
  { id: 'temporal',  label: 'Tendencia Temporal' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('resumen')

  return (
    <>
      <Header />
      <nav className="tab-nav" role="tablist">
        {TABS.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={activeTab === t.id}
            className={`tab-btn${activeTab === t.id ? ' tab-btn--active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <main className="main-content">
        {activeTab === 'resumen' && (
          <>
            <ExecutiveSummary data={data} />
            <KPIPanel kpis={data.kpis} />
          </>
        )}
        {activeTab === 'ventas'   && <VentasSection   data={data.ventas} />}
        {activeTab === 'geo'      && <GeoSection      data={data.geo} />}
        {activeTab === 'clientes' && <ClientesSection data={data.clientes} />}
        {activeTab === 'temporal' && <TemporalSection data={data.temporal} />}
      </main>
      <Footer />
    </>
  )
}
