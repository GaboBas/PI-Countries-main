let initialState = {
  countries: [],
  filteredCountries: [],
  countryDetail: [],
  activities: [],
  loading: [],
  filters: false
};

function orderMax (a,b, property) {           //Paso property para llamar a las mismas funciones con orderByName y orderByPopulation
  if(a[property]>b[property]) return 1;
          if(a[property]<b[property]) return -1;
          else return 0;
}

function orderMin (a,b, property)  {
  if(a[property]>b[property]) return -1;
          if(a[property]<b[property]) return 1;
          else return 0;
}

let orderFiltered;
let order;

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_COUNTRIES":
      return { ...state, loading: true };
    case "GET_COUNTRIES": {
      return { ...state, countries: action.payload, filteredCountries: action.payload, loading: false, filters:false };
    }
    case "SEARCH_COUNTRY":
      return { ...state, filteredCountries: action.payload, filters:true};
    case "GET_COUNTRY_DETAIL":
      return { ...state, countryDetail: action.payload };
    case "GET_ACTIVITIES":
      return {...state, activities: action.payload}
    case "FILTER_BY_CONTINENT":
      const allCountries = state.countries;
      
      const filteredCountries = action.payload === 'All' ? allCountries : allCountries.filter(c=> c.continent === action.payload)

      return {...state, filteredCountries: filteredCountries, filters: true};
    case "ORDER_BY_NAME":
      
      if(action.payload === 'asc'){
        orderFiltered = state.filteredCountries.sort((a,b) => orderMax(a,b, 'name'))
        order = state.countries.sort((a,b) => orderMax(a,b, 'name'))
      } else{
        orderFiltered = state.filteredCountries.sort((a,b) => orderMin(a,b, 'name'))
        order = state.countries.sort((a,b) => orderMin(a,b, 'name'))
      }

      return {...state, filteredCountries: orderFiltered, countries: order, filters:true};
    
      case "ORDER_BY_POPULATION":

      if(action.payload === 'max'){
        orderFiltered = state.filteredCountries.sort((a,b) => orderMin(a,b, 'population'))
        order = state.countries.sort((a,b) => orderMin(a,b, 'population'))
      } else{
        orderFiltered = state.filteredCountries.sort((a,b) => orderMax(a,b, 'population'))
        order = state.countries.sort((a,b) => orderMax(a,b, 'population'))
      }

      return {...state, filteredCountries: orderFiltered, countries: order, filters:true};

      case "POST_ACTIVITY":
        return {...state};
    default:
      return {...state};
  }
}
