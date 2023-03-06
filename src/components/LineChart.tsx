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
  const initialized = useRef(false)
  useEffect(() => {
    if (initialized.current) { return }
    if (!div.current) { return }
    const myChart = echarts.init(div.current)
    initialized.current = true
    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        show: true,
        formatter: ([{ axisValue, data }]: any) => {
          const parts = axisValue.split('-')
          const label = `${parts[1]}/${parts[2]}/${parts[0]}`
          const value = data === null ? 'No data' : `${data}`
          return `${label}<br/><div style="text-align: right;">$${value}</div>`
        }
      },
      grid: {
        left: 16,
        top: 8,
        bottom: 24,
        right: 16
      },
      xAxis: {
        type: 'category',
        data: xItems,
        axisLabel: {
          formatter: (label: string) => label.slice(label.indexOf('-') + 1)
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: false
        },
      },
      series: [
        {
          data: yItems,
          type: 'line',
          itemStyle: {
          },
          emphasis: {
            itemStyle: {
              color: 'green'
            }
          }
        }
      ]
    }
    myChart.setOption(option)
  }, [])
  return (
    <div ref={div} className={className}></div>
  )
}
