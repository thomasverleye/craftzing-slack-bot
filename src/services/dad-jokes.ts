import axios from 'axios';

class DadJokes {
  static async randomJoke() {
    try {
      const { status, data: response } = await axios.get(
        'https://dad-jokes.p.rapidapi.com/random/joke',
        {
          headers: {
            'X-RapidAPI-Key': process.env.DAD_JOKES_API_KEY as string,
            'X-RapidAPI-Host': process.env.DAD_JOKES_API_HOST as string,
          },
        },
      );

      if (status === 200 && response.success) {
        const body = response.body.shift();
        return [body.setup, body.punchline];
      }

      return false;
    } catch {
      return false;
    }
  }
}

export default DadJokes;
