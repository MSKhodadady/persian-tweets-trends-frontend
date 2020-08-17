
const urls = {
  user: {
    url: 'http://localhost:5000/api/user',

    get: (count: number, start: number) => `?count=${count}&start=${start}`,

    delete: (username: string) => ({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username
      })
    }),
    patch: (username: string, isCrawl: boolean) => ({
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        'is-crawl': isCrawl
      })
    }),
    post: (username: string, since: string, until: string) => ({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        'crawl-since': since,
        'crawl-until': until
      })
    }),
    deleteTweets: (username: string, since: string, until: string) => ({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        'delete-tweets': {
          start: since,
          end: until
        }
      })
    }),
    put: (username: string) => ({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username
      })
    })
  },

  dictionary: {
    url: 'http://localhost:5000/api/dict',

    get: (count: number, start: number) => `?count=${count}&start=${start}`,

    put: (token: string, replaceWith: string | null) => ({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        'replace-with': replaceWith
      })
    }),

    delete: (token: string) => ({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token
      })
    })
  },

  chart: {
    url: 'http://localhost:5000/api/chart',
    post: (body: object) => ({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }
};

export default urls;
