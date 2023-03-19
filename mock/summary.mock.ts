import type { MockMethod } from 'vite-plugin-mock'

export const summaryMock: MockMethod[] = [{
  url: '/api/v1/items/summary',
  method: 'get',
  statusCode: 200, // 200 401
  timeout: 1000,
  response: ({ query }: ResponseParams) => {
    if (query.group_by === 'happen_at') {
      if (query.happened_after === '2023-03-01') {
        return {
          groups: [
            { happen_at: '2023-03-01', tag: null, amount: 100 },
            { happen_at: '2023-03-15', tag: null, amount: 200 },
            { happen_at: '2023-03-31', tag: null, amount: 300 }
          ],
          total: 900
        }
      } else if (query.happened_after === '2023-02-01') {
        return {
          groups: [
            { happen_at: '2023-02-01', tag: null, amount: 100 },
            { happen_at: '2023-02-02', tag: null, amount: 200 },
            { happen_at: '2023-02-03', tag: null, amount: 300 }
          ],
          total: 900
        }
      }
    } else if (query.group_by === 'tag_id') {
      if (query.happened_after === '2023-03-01') {
        return {
          groups: [
            {
              tag_id: 5495,
              tag: {
                id: 5495,
                user_id: 2014,
                name: 'Rei.',
                sign: '😀',
                deleted_at: null,
                created_at: '2023-03-15T17:49:18.821+08:00',
                updated_at: '2023-03-15T17:49:18.821+08:00',
                kind: 'expenses'
              },
              amount: 500
            },
            {
              tag_id: 5493,
              tag: {
                id: 5493,
                user_id: 2014,
                name: 'Bla.',
                sign: '❤',
                deleted_at: null,
                created_at: '2023-03-15T17:49:18.814+08:00',
                updated_at: '2023-03-15T17:49:18.814+08:00',
                kind: 'expenses'
              },
              amount: 400
            },
            {
              tag_id: 5494,
              tag: {
                id: 5494,
                user_id: 2014,
                name: 'Off.',
                sign: '❤',
                deleted_at: null,
                created_at: '2023-03-15T17:49:18.818+08:00',
                updated_at: '2023-03-15T17:49:18.818+08:00',
                kind: 'expenses'
              },
              amount: 300
            }
          ],
          total: 600
        }
      } else if (query.happened_after === '2023-02-01') {
        return {
          groups: [
            {
              tag_id: 5495,
              tag: {
                id: 5495,
                user_id: 2014,
                name: 'A',
                sign: '😀',
                deleted_at: null,
                created_at: '2023-03-15T17:49:18.821+08:00',
                updated_at: '2023-03-15T17:49:18.821+08:00',
                kind: 'expenses'
              },
              amount: 700
            },
            {
              tag_id: 5493,
              tag: {
                id: 5493,
                user_id: 2014,
                name: 'B',
                sign: '❤',
                deleted_at: null,
                created_at: '2023-03-15T17:49:18.814+08:00',
                updated_at: '2023-03-15T17:49:18.814+08:00',
                kind: 'expenses'
              },
              amount: 800
            },
            {
              tag_id: 5494,
              tag: {
                id: 5494,
                user_id: 2014,
                name: 'C',
                sign: '❤',
                deleted_at: null,
                created_at: '2023-03-15T17:49:18.818+08:00',
                updated_at: '2023-03-15T17:49:18.818+08:00',
                kind: 'expenses'
              },
              amount: 900
            }
          ],
          total: 600
        }
      }
    }
  },
}]
