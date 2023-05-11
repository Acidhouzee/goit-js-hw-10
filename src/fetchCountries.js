const URL = 'https://restcountries.com/v3.1/name';
import Notiflix from 'notiflix';

function fetchCountries(name) {
    return fetch(`${URL}/${name}`)
    .then((res) => {
        if (!res.ok) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        }
        return res.json();
      });
}

export {fetchCountries};