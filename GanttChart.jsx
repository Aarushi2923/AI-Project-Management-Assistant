import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList
} from 'recharts'

/**
 * Simple Gantt-style horizontal bars using Recharts.
 * Expects data: [{ name: 'Sprint 1', start: 0, end: 2, duration: 2 }]
 * Renders stacked bars by using "start" as an invisible spacer.
 */
export default function GanttChart({ data = [] }){
  // transform to stacked segments: spacer + duration
  const tdata = data.map(d => ({ name: d.name, spacer: d.start, duration: d.duration }))

  return (
    <div className="section">
      <h2>Gantt Timeline — Visual</h2>
      <div style={{width:'100%', height: 320}}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={tdata}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={90} />
            <Tooltip />
            <Bar dataKey="spacer" stackId="a" fill="transparent" />
            <Bar dataKey="duration" stackId="a">
              <LabelList dataKey="duration" position="insideRight" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="small">Units are in weeks (customizable).</div>
    </div>
  )
}