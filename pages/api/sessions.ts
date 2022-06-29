// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosError } from 'axios'

const clientApi = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

interface AuthResponse {
  statusCode: number
  data: {
    token: string
    refreshToken: string
    permissions: string
    roles: [string]
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await clientApi
    .post<AuthResponse>('/sessions', req.body)
    .then((resp) => res.status(resp.status).json(resp.data))
    .catch((err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        res.status(err.response?.status || 500).json(err.response?.data)
      } else {
        res.status(500).json({
          error: true,
          message: 'Serviço indisponível, tente novamente mais tarde.',
        })
      }
    })
}
