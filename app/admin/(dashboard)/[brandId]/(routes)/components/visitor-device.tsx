"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

type Props = {
  LiveVisitor: { device: string, users: number }[]
};

export function VisitorDevice(props: Props) {
  return (
        <div className="h-[312px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={props.LiveVisitor}
              dataKey="users"
              nameKey="device"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {props.LiveVisitor.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    [
                      '#1c00bd', // blue
                      '#1352db',
                      '#674dff',
                      '#8f94ff', 
                      '#b5b8ff',
                      '#ffffff', 
                    ][index % 6]
                  }
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
         </div>
  )
}
