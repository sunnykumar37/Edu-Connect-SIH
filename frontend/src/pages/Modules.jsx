import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function Modules() {
  const [modules, setModules] = useState([])
  const [title, setTitle] = useState('')

  async function load() {
    const { data } = await api.get('/modules')
    setModules(data.items || [])
  }
  useEffect(() => { load() }, [])

  async function create(e) {
    e.preventDefault()
    await api.post('/modules', { title })
    setTitle('')
    await load()
  }

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Manage Modules</h2>
        <form className="form" onSubmit={create}>
          <div>
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <button className="btn">Add</button>
        </form>
      </div>
      <div style={{ height: 12 }} />
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Modules</h3>
        {(modules || []).map(m => (<div key={m._id} className="card">{m.title}</div>))}
        {(!modules || modules.length === 0) && <div>No modules yet.</div>}
      </div>
    </div>
  )
}


