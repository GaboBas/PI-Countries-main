import axios from "axios";

const urlCountries = "http://localhost:3001/countries";
const urlActivities = "http://localhost:3001/activities";

export function loading() {
  return {
    type: "LOAD_COUNTRIES",
  };
}

export function getCountries() {
  return function (dispatch) {
    dispatch(loading());
    axios.get(urlCountries).then((countries) => {
      return dispatch({
        type: "GET_COUNTRIES",
        payload: countries.data,
      });
    });
  };
}

export function searchCountry(name) {
  return function (dispatch) {
    axios.get(`${urlCountries}?name=${name}`).then((country) => {
      return dispatch({
        type: "SEARCH_COUNTRY",
        payload: country.data,
      });
    })
    .catch(e=>{
      console.log(e.message)
    });
  };
}

export function getCountryDetail(id) {
  console.log('Entro en getCountryDetail')
  return function (dispatch) {
    axios.get(`${urlCountries}/${id}`).then((detail) => {
      console.log(detail.data)
      return dispatch({
        type: "GET_COUNTRY_DETAIL",
        payload: detail.data,
      });
    })
    .catch(e=> {
      return dispatch({
        type: "GET_COUNTRY_DETAIL",
        payload: null,
      })
    });
  };
}

export function getActivities() {
  return function (dispatch) {
    axios.get(urlActivities).then((activities) => {
      return dispatch({
        type: "GET_ACTIVITIES",
        payload: activities.data,
      });
    })
    .catch(e=>console.log(e))
  };
}
export function createActivity(activity) {
  return function(dispatch){
  axios.post(urlActivities, activity)
  .then(response => {
    return dispatch({type: "POST_ACTIVITY", payload: response})})
  }
}

export function filterByActivity(activity) {
  return{
    type: "FILTER_BY_ACTIVITY",
    payload: activity
  }
}

export function filterByContinent(continent){
  return {
    type: "FILTER_BY_CONTINENT",
    payload: continent
  }
  }

export function orderByName(payload){
  return {
    type: "ORDER_BY_NAME",
    payload
  }
  }

export function orderByPopulation(payload){
  return {
    type: "ORDER_BY_POPULATION",
    payload
  }
  }

  
