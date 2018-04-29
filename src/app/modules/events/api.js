const sendCalendarRequest = (payload) => {
  const url = 'api/calendar/add';

  const OPTIONS = {
    credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  return fetch(url, OPTIONS)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return Promise.resolve(response.json());
    })
    .then(json => json);
};

export default sendCalendarRequest;
