import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

export const LineChart: React.FC = () => {
  const div = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!div.current) { return }
    const myChart = echarts.init(div.current)
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    }
    myChart.setOption(option)
  }, [])
  return (
    <div ref={div} h-400px></div>
  )
}
