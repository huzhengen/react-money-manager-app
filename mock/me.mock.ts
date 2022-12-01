import type { MockMethod } from 'vite-plugin-mock'

export const meMock: MockMethod = {
  url: '/api/v1/me',
  method: 'get',
  statusCode: 200,
  response: (): Resource<User> => {
    return {
      resource: {
        id: 1,
        email: '1@gmail.com',
        updated_at: '2021-08-01T00:00:00.000Z',
        created_at: '2021-08-01T00:00:00.000Z',
      }
    }
  },
}
