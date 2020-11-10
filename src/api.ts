import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/'
})

type ApiParams = {
  page?: number
  name?: string
  status?: string
  species?: string
  type?: string
  gender?: string
}

export const api = {
  getCharacters: (page = 1, filters: ApiParams) => {
    const params: ApiParams = { page }
    if (filters.name) params.name = filters.name
    if (filters.status) params.status = filters.status
    if (filters.species) params.species = filters.species
    if (filters.type) params.type = filters.type
    if (filters.gender) params.gender = filters.gender
    return axiosInstance.get(`/character/`, { params })
  }
}
