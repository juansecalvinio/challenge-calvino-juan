const baseUrl = 'http://localhost:3003/api';
const baseWeatherUrl = 'https://www.metaweather.com/api/location/468739/';

const fetchParams = (method, data = '') => {
  const body = data ? { body: JSON.stringify(data) } : {}

  return {
    method: method,
    headers: apiHeaders,
    credentials: 'same-origin',
    ...body,
  }
}

const apiHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

const api = {
  getUser: async (user) => {
      const userResponse = await fetch(baseUrl + '/auth/login', fetchParams('POST', user))
      const { datos: userInfo } = await userResponse.json();
      
      return userInfo;
  },
  getMeetupsUser: async (id) => {
    const meetupsUserResponse = await fetch(baseUrl + '/meetups/user/' + id, fetchParams('GET'));
    const { datos: meetupsUser } = await meetupsUserResponse.json();
    return meetupsUser;
  },
  getMeetups: async () => {
    const meetupsResponse = await fetch(baseUrl + '/meetups/', fetchParams('GET'))
    const { datos: meetups } = await meetupsResponse.json()
    return meetups;
  },
  getMeetup: async id => {
    const meetupResponse = await fetch(baseUrl + '/meetups/' + id, fetchParams('GET'))
    const meetup = await meetupResponse.json();
    return meetup;
  },
  getWeather: async () => {
    const weatherResponse = await fetch(baseWeatherUrl, fetchParams('GET'));
    const weather = await weatherResponse.json();
    return weather;
  },
  getWeatherByDay: async (date) => {
    const weatherDayResponse = await fetch(baseWeatherUrl + date, fetchParams('GET'));
    const weatherDay = await weatherDayResponse.json();
    return weatherDay;
  }
}

export default api;