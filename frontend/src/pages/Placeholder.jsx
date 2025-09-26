export default function Placeholder({ title }) {
  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 720, textAlign: 'center' }}>
        <h2 style={{ marginTop: 0 }}>{title}</h2>
        <p style={{ fontSize: '18px', opacity: 0.8 }}>Coming Soon</p>
        <p style={{ opacity: 0.6 }}>This feature is under development and will be available soon.</p>
      </div>
    </div>
  )
}


