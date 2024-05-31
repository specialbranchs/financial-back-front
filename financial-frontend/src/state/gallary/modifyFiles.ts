import axios from 'axios'
import { size } from 'lodash'
import { STATUS_UPLOAD } from '../../utils/constants'


export const modifyFiles = (existingFiles:any, container:any) => {
  let fileToUpload = {}
 
  const files=container.files;
  const relationId=container.id
  for (let i = 0; i < files.length; i++) {
    const id = size(existingFiles) + i + 1
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()

    fileToUpload = {
      ...fileToUpload,
      [id]: {
        id,
        file: files[i],
        relationId:relationId,
        progress: 0,
        cancelSource: source,
        status: STATUS_UPLOAD.uploading,
      },
    }
  }

  return fileToUpload
}