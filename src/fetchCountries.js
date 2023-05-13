const URL = 'https://restcountries.com/v3.1/name';
import Notiflix from 'notiflix';

function fetchCountries(name) {
    return fetch(`${URL}/${name}`)
    .then((res) => {
        if (!res.ok) {
            throw new Error(res.status);
        }
        return res.json();
      });
}

export {fetchCountries};