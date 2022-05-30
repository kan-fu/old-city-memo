import { MemoryData } from '../types'
import { baseMemoryUrl } from '../constants'

const createMemory = async (data: MemoryData, token: string): Promise<MemoryData> => {
  const config = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'Application/json',
      // mode: 'cors',
      // 'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
    body: JSON.stringify(data),
  }
  const response = await fetch(baseMemoryUrl, config)
  return response.json()
}

const getAllMemory = async (): Promise<MemoryData[]> => {
  const response = await fetch(baseMemoryUrl)
  return response.json()
}

const getOneMemory = async (id: string): Promise<MemoryData> => {
  const response = await fetch(`${baseMemoryUrl}/${id}`)
  return response.json()
}

const deleteMemory = async (id: string, token: string): Promise<any> => {
  const config = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'Application/json',
      // mode: 'cors',
      // 'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
  }
  const response = await fetch(`${baseMemoryUrl}/${id}`, config)
  return response
}

const memoryService = { createMemory, getAllMemory, getOneMemory, deleteMemory }
export default memoryService
