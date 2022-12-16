const KEY = '30861394-45e6fcfd438676dc717df7503';

async function FetchPhoto(name, page = 1) {
  const options = new URLSearchParams({
    key: KEY,
    q: name,
    per_page: 12,
    page,
  });

  return fetch(`https://pixabay.com/api/?${options}`).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      return Promise.reject(new Error(`Ooops, we can't download this request`));
    }
  });
}

export default FetchPhoto;
