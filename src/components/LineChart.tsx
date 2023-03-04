import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

type Props = {
  className?: string
  items?: { x: string; y: number }[]
}

export const LineChart: React.FC<Props> = (props) => {
  const { className, items } = props
  const xItems = items?.map(item => item.x)
  const yItems = items?.map(item => item.y)
  const div = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!div.current) { return }
    const myChart = echarts.init(div.current)
    const option = {
      xAxis: {
        type: 'category',
        data: xItems
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: yItems,
          type: 'line'
        }
      ]
    }
    myChart.setOption(option)
  }, [])
  return (
    <div ref={div} className={className}></div>
  )
}
