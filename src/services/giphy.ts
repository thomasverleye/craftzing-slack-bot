import axios from 'axios';

class Giphy {
  static async randomGif(q: string) {
    try {
      const { status, data: response } = await axios.get(
        'https://api.giphy.com/v1/gifs/random',
        {
          params: {
            api_key: process.env.GIPHY_API_KEY,
            rating: 'g',
            tag: q,
          },
        },
      );

      if (status === 200 && response.meta.status === 200) {
        return response.data.images.downsized.url;
      }

      return false;
    } catch {
      return false;
    }
  }
}

export default Giphy;
