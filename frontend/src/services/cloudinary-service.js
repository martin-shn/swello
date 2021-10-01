import axios from 'axios';
import { utilService } from './util.service';
export const cloudinaryService = { uploadFile, uploadImg };

const CLOUD_NAME = 'avivyaari';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const UPLOAD_PRESET = 'k9e87w7t';

async function uploadFile(ev) {
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

async function uploadImg(ev) {
  const formData = new FormData();
  // console.log('target', ev.target);
  formData.append('file', ev.target.files[0]);
  // console.log('ev.target.files[0]):', ev.target.files[0]);
  formData.append('upload_preset', UPLOAD_PRESET);
  // console.log('formData:', formData);

  try {
    const res = await axios.post(UPLOAD_URL, formData);
    const { url } = res.data;
    const previewHeight = await getCoverImgHeight(url)
    const img = {
      id: utilService.makeId(),
      url,
      theme: 'light',
      previewHeight
    }
    return img;
  } catch (err) {
    throw err;
  }
}

function getCoverImgHeight(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(img.height / img.width * 252)
    };
    img.src = url;

  })
}


