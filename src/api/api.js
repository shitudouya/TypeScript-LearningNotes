import axios from './axios'

let getHTMLContent = async (params) => {
  return await axios.get('/file',{params})
}
export {
  getHTMLContent
}