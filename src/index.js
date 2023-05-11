import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info')

function buildCountriesList(countries) {
    const list = countries
    .map((country) => {
      return `<li class="${countries.length === 1 ? 'list-item-big' : 'list-item'}">
        <img class="${countries.length === 1 ? 'flag-big' : 'flag'}" src="${country.flags.png}">${country.name.common}
        </li>`;
    })
    .join("");
    countryList.innerHTML = list;
}

function buildCountryInfo(countries) {
    const info = countries
    .map((info) => {
        const languages = Object.keys(info.languages)
            .map((language) => info.languages[language])
            .join(", ");
        return `
            <ul>
                <li class="list-item">
                    <b>Capital</b>: ${info.capital}
                </li>
                <li class="list-item">
                    <b>Population</b>: ${info.population}
                </li>
                <li class="list-item">
                    <b>Languages</b>: ${languages}
                </li>
            </ul>`;
    })
    .join("");
    countryInfo.innerHTML = info;
}

const debounced = debounce((event) => {
    const value = event.target.value.trim();
    if(value === '') {
        Notiflix.Notify.info('Type country name');
        countryList.innerHTML = '';
    }
    if(value) {
        fetchCountries(value).then((result) => {
            console.log(result);
            if(result.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } else if (result.length >= 2 && result.length <=10) {
                buildCountriesList(result);
                countryInfo.innerHTML = '';
            } else if(result.length === 1) {
                buildCountriesList(result);
                buildCountryInfo(result);
            }
        });  
    }
}, DEBOUNCE_DELAY); 

inputCountry.addEventListener('input', debounced);