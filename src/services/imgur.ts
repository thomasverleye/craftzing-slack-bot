import axios from 'axios';
import FormData from 'form-data';
import { createReadStream } from 'fs';

class Imgur {
  static async upload(path: string) {
    const data = new FormData();
    data.append('image', createReadStream(path));

    try {
      const { status, data: response } = await axios.post(
        'https://api.imgur.com/3/image',
        data,
        {
          headers: {
            'Content-Type': `multipart/form-data`,
            Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
          },
        },
      );

      if (status === 200 && response.success) {
        return response.data.link;
      }

      return false;
    } catch {
      return false;
    }
  }
}

export default Imgur;
