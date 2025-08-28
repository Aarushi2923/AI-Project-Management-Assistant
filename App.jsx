import React, { useMemo, useRef, useState } from 'react'
import Section from './components/Section.jsx'
import GanttChart from './components/GanttChart.jsx'
import { exportNodeToPDF } from './utils/exportPdf.js'

const defaultForm = {
  projectName: '',
  domain: 'Software',
  methodology: 'Agile (Scrum)',
  timelineWeeks: 8,
  objectives: '',
  stakeholders: '',
  risks: ''
}

const example = {
  projectName: 'Healthcare App Development',
  domain: 'Healthcare',
  methodology: 'Agile (Scrum)',
  timelineWeeks: 12,
  objectives: 'Secure patient onboarding, appointment booking, e-prescriptions, HIPAA compliance.',
  stakeholders: 'Product Owner, CTO, Lead Engineer, QA Lead, Compliance Officer, Pilot Clinic',
  risks: 'Regulatory delays, data privacy breaches, third-party API downtime, scope creep.'
}

function FancyHeader(){
  return (
    <div className="header">
      <div className="logo">PM</div>
      <div>
        <div className="title">AI Project Management Assistant</div>
        <div className="subtle">Generate a structured, presentation-ready plan — then export as PDF.</div>
      </div>
      <div style={{marginLeft:'auto', display: 'flex', gap: 8}}>
        <span className="badge">Recharts</span>
        <span className="badge">html2canvas</span>
        <span className="badge">jsPDF</span>
      </div>
    </div>
  )
}

export default function App(){
  const [form, setForm] = useState(defaultForm)
  const [plan, setPlan] = useState(null)
  const rootRef = useRef(null)

  const sprints = useMemo(() => {
    const weeks = Number(form.timelineWeeks || 8)
    const sprintLen = Math.max(1, Math.round(weeks / 4))
    return Array.from({ length: Math.max(1, Math.round(weeks / sprintLen)) }, (_, i) => ({
      name: `Sprint ${i+1}`,
      start: i * sprintLen,
      end: Math.min(weeks, (i+1) * sprintLen),
      duration: Math.min(weeks, (i+1) * sprintLen) - i * sprintLen
    }))
  }, [form.timelineWeeks])

  function setField(k, v){
    setForm(prev => ({ ...prev, [k]: v }))
  }

  function loadExample(){
    setForm(example)
  }

  function generate(){
    const bold = (label) => <strong style={{fontWeight: 900}}>{label}: </strong>

    const overview = (
      <div className="section">
        <h2>Project Overview</h2>
        <p><span style={{fontWeight:900}}>Project Name:</span> {form.projectName || '—'}</p>
        <p><span style={{fontWeight:900}}>Domain:</span> {form.domain || '—'}</p>
        <p><span style={{fontWeight:900}}>Methodology:</span> {form.methodology || '—'}</p>
        <p><span style={{fontWeight:900}}>Timeline:</span> {form.timelineWeeks || '—'} weeks</p>
        <p><span style={{fontWeight:900}}>Objectives:</span> {form.objectives || '—'}</p>
        <p><span style={{fontWeight:900}}>Stakeholders:</span> {form.stakeholders || '—'}</p>
        <p><span style={{fontWeight:900}}>Risks:</span> {form.risks || '—'}</p>
      </div>
    )

    const sections = [
      {
        title: '1. Project Initiation',
        bullets: [
          'Define scope & success criteria; capture high-level requirements and constraints.',
          'Identify stakeholders; map RACI and engagement approach.',
          'Draft business case: problem, value, ROI, and KPIs.',
          'Feasibility checks: technical, operational, legal/regulatory.',
          'Establish governance: decision rights, cadence, and change control entry/exit.'
        ]
      },
      {
        title: '2. Project Planning',
        bullets: [
          'Decompose WBS with deliverables, acceptance criteria, and DoR/DoD.',
          'Build schedule baseline: sprints, milestones, critical path; estimate via story points/T-shirt sizes.',
          'Budget baseline: capex/opex, burn rate, contingency, and reserves.',
          'Risk planning: register (probability × impact), owners, response strategies.',
          'Quality planning: test strategy, Definition of Done, non-functional criteria.'
        ]
      },
      {
        title: '3. Project Execution',
        bullets: [
          'Prioritize backlog; run sprint planning, daily standups, and pair programming.',
          'Implement CI with automated tests; code reviews and branch policies.',
          'Demo to stakeholders each sprint; capture feedback and feed to backlog.',
          'Manage vendors & environments; ensure observability and logging.',
          'Control changes via lightweight CCB; assess impact before approval.'
        ]
      },
      {
        title: '4. Monitoring & Control',
        bullets: [
          'Track KPIs: velocity, burndown, lead time, escaped defects, uptime.',
          'Variance analysis on schedule/budget; forecast EAC/ETC where needed.',
          'Risk/issue control: update register, execute mitigations, escalate blockers.',
          'Quality control: test coverage, defect trend, performance SLAs.',
          'Stakeholder comms: status reports, RAID log, dependency board.'
        ]
      },
      {
        title: '5. Project Closure',
        bullets: [
          'Formal acceptance & sign-off; verify scope completion against criteria.',
          'Operational handover: runbooks, SOPs, support SLAs, knowledge base.',
          'Retrospective & lessons learned; archive artifacts and code.',
          'Release resources, communicate closure, celebrate wins.',
          'Post-implementation review (30/60/90-day benefits tracking).'
        ]
      }
    ]

    setPlan({ overview, sections })
  }

  async function onExport(){
    if(!rootRef.current) return
    await exportNodeToPDF(rootRef.current, 'AI-PM-Plan.pdf')
  }

  return (
    <div className="container">
      <div className="glass">
        <FancyHeader />
        <div className="grid">
          <div className="card">
            <label>Project Name</label>
            <input className="input" value={form.projectName} onChange={e=>setField('projectName', e.target.value)} placeholder="e.g., AI-Powered Support Bot" />

            <div className="row">
              <div>
                <label>Domain</label>
                <input className="input" value={form.domain} onChange={e=>setField('domain', e.target.value)} placeholder="e.g., FinTech, Healthcare" />
              </div>
              <div>
                <label>Methodology</label>
                <select value={form.methodology} onChange={e=>setField('methodology', e.target.value)}>
                  <option>Agile (Scrum)</option>
                  <option>Kanban</option>
                  <option>Waterfall</option>
                  <option>Hybrid</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div>
                <label>Timeline (weeks)</label>
                <input type="number" min="1" className="input" value={form.timelineWeeks} onChange={e=>setField('timelineWeeks', e.target.value)} />
              </div>
            </div>

            <label>Objectives</label>
            <textarea rows="2" className="input" value={form.objectives} onChange={e=>setField('objectives', e.target.value)} placeholder="What outcomes do you want?" />

            <label>Stakeholders</label>
            <textarea rows="2" className="input" value={form.stakeholders} onChange={e=>setField('stakeholders', e.target.value)} placeholder="Who is involved/impacted?" />

            <label>Risks</label>
            <textarea rows="2" className="input" value={form.risks} onChange={e=>setField('risks', e.target.value)} placeholder="Top risks & assumptions" />

            <div className="help">Tip: Use <span className="code">Load Example</span> to demo the app instantly.</div>

            <div style={{display:'flex', gap:8, marginTop:12}}>
              <button className="btn secondary" onClick={loadExample}>Load Example</button>
              <button className="btn" onClick={generate}>✨ Generate Structured Plan</button>
            </div>
          </div>

          <div className="card">
            <div ref={rootRef}>
              <div className="section">
                <h2>Outcome</h2>
                <ul>
                  <li><strong>Bold, clearly separated</strong> headings & subheadings for each PM phase.</li>
                  <li><strong>Actionable bullets</strong> to aid decision-making.</li>
                  <li><strong>Gantt-style visualization</strong> with Recharts.</li>
                  <li><strong>One-click PDF export</strong> including the chart.</li>
                </ul>
              </div>

              {plan?.overview}

              {plan && (
                <>
                  {plan.sections.map((s, i) => (
                    <Section key={i} title={s.title}>
                      <h3>Key Actions</h3>
                      <ul>
                        {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
                      </ul>
                    </Section>
                  ))}
                  <GanttChart data={sprints} />
                </>
              )}
            </div>

            <div className="footer">
              <button className="btn secondary" onClick={()=>navigator.clipboard.writeText(document.querySelector('#root').innerText)}>Copy All Text</button>
              <button className="btn" onClick={onExport}>📄 Download PDF</button>
            </div>
          </div>
        </div>
      </div>
      <div className="small" style={{textAlign:'center', marginTop:10}}>Built with React + Vite • Deploy to GitHub Pages via <span className="code">npm run build</span></div>
    </div>
  )
}