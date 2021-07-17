import axios from 'axios';

export const uploadImg = async(file) => {
    const CLOUD_NAME = 'dsnxbqbvl' // Insert yours
    const UPLOAD_PRESET = 'jcxq5ftd' // Insert yours
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    try {
        let res = await axios({ method: 'get', url: file.url, responseType: 'blob' })
        var reader = new FileReader();
        reader.readAsDataURL(res.data);
        return new Promise(resolve => {
            reader.onloadend = () => {
                var base64data = reader.result;
                const FORM_DATA = new FormData();
                FORM_DATA.append('file', base64data)
                FORM_DATA.append('upload_preset', UPLOAD_PRESET)
                axios.post(UPLOAD_URL, FORM_DATA)
                    .then(res => {
                        resolve(res.data)
                    })
            }
        })
    } catch (err) {
        console.error('ERROR!', err)
    }
}