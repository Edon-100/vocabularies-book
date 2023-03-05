import { createInstance } from "../utils/request"

const bookBaseUrl = 'http://localhost:3000'

const bookApi = createInstance(bookBaseUrl)

export const getWordList = async (page = 1,limit = 200) => {
  const data = await bookApi.get('/word',{
    params: {
      page,
      limit
    }
  })
  return data.data
 }

 export const addWord = async (text:string) => {
  const data = await bookApi.post('/word', {
    text
  })
  return data.data
 }

 export const updateWord = async (id:number, postData: {
  action: 'upgrade' | 'downgrade',
  isDone?: boolean
 }) =>  {
  const res = await bookApi.patch(`word/review/${id}`, 
    postData
  )
  return res.data
 }

 export const deleteWord = async (id:number)  => {
  const res = await bookApi.delete(`word/${id}`)
  return res.data
 }


export const getProfile = async () => {
  const data = await bookApi.get('/profile')
  return data.data
 }

export const login = async (username:string, password:string) => {
  const res = await bookApi.post('/login', {
    username,
    password
  })
  return res.data
}
 