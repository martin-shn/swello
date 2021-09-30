import axios from 'axios';
import { utilService } from './util.service';
export const cloudinaryService = { uploadFile };

async function uploadFile(ev) {
  const CLOUD_NAME = 'avivyaari';
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const UPLOAD_PRESET = 'k9e87w7t';

  const formData = new FormData();
  // console.log('target', ev.target);
  formData.append('file', ev.target.files[0]);
  // console.log('ev.target.files[0]):', ev.target.files[0]);
  formData.append('upload_preset', UPLOAD_PRESET);
  // console.log('formData:', formData);

  try {
    const res = await axios.post(UPLOAD_URL, formData);
    const { url } = res.data;
    const { name, type } = ev.target.files[0];
    const attachment = {
      id: utilService.makeId(),
      createdAt: Date.now(),
      url,
      name,
      type: type.split('/')[0],
      suffix: type.split('/')[1],
    };
    return attachment;
  } catch (err) {
    throw err;
  }
}
