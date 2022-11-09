import axios from "axios";

const urlCountries = "http://localhost:3001/countries";

export function getCountries() {
  return function (dispatch) {
    axios.get(urlCountries)
    .then(countries => {
      return dispatch({
        action: "GET_COUNTRIES",
        payload: countries.data,
      });
    });
  };
}

export function searchCountry(name) {
  return function (dispatch) {
    axios.get(`${urlCountries}?name=${name}`)
    .then(country => {
      return dispatch({
        action: "SEARCH_COUNTRY",
        payload: country.data,
      });
    });
  };
}

export function getCountryDetail(id) {
    return function(dispatch) {
        axios.get(`${urlCountries}/:id`)
        .then(detail => {
            return dispatch({
                action: 'GET_COUNTRY_DETAIL',
                payload: detail.data
            })
        })
    }
}

export function createActivity(activity){

}