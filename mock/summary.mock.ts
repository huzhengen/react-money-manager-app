import type { MockMethod } from 'vite-plugin-mock'

export const summaryMock: MockMethod[] = [{
  url: '/api/v1/items/summary',
  method: 'get',
  statusCode: 200, // 200 401
  timeout: 1000,
  response: () => {
    return {
      groups: [
        { happen_at: '2023-03-01', tag: null, amount: 100 },
        { happen_at: '2023-03-15', tag: null, amount: 200 },
        { happen_at: '2023-03-31', tag: null, amount: 300 }
      ],
      total: 900
    }
  },
}]
