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

export default function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <ExecutiveSummary data={data} />
        <KPIPanel kpis={data.kpis} />
        <VentasSection data={data.ventas} />
        <div className="section-divider" />
        <GeoSection data={data.geo} />
        <div className="section-divider" />
        <ClientesSection data={data.clientes} />
        <div className="section-divider" />
        <TemporalSection data={data.temporal} />
      </main>
      <Footer />
    </>
  )
}
