let initialState = {
  countries: [],
  filteredCountries: [],
  countryDetail: null,
  activities: [],
  loading: [],
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
      return { ...state, countries: action.payload, filteredCountries: action.payload, loading: false};
    }
    case "SEARCH_COUNTRY":
      return { ...state, filteredCountries: action.payload};
    case "GET_COUNTRY_DETAIL":
      return { ...state, countryDetail: action.payload, loading:false };
    case "GET_ACTIVITIES":
      return {...state, activities: action.payload}
    case "FILTER_BY_CONTINENT":
      const allCountries = state.countries;
      
      const filteredCountries = action.payload === 'All' ? allCountries : allCountries.filter(c=> c.continent === action.payload)

      return {...state, filteredCountries: filteredCountries};
    case "ORDER_BY_NAME":
      
      if(action.payload === 'asc'){
        orderFiltered = state.filteredCountries.sort((a,b) => orderMax(a,b, 'name'))
        order = state.countries.sort((a,b) => orderMax(a,b, 'name'))
      } else{
        orderFiltered = state.filteredCountries.sort((a,b) => orderMin(a,b, 'name'))
        order = state.countries.sort((a,b) => orderMin(a,b, 'name'))
      }

      return {...state, filteredCountries: orderFiltered, countries: order};
    
      case "ORDER_BY_POPULATION":

      if(action.payload === 'max'){
        orderFiltered = state.filteredCountries.sort((a,b) => orderMin(a,b, 'population'))
        order = state.countries.sort((a,b) => orderMin(a,b, 'population'))
      } else{
        orderFiltered = state.filteredCountries.sort((a,b) => orderMax(a,b, 'population'))
        order = state.countries.sort((a,b) => orderMax(a,b, 'population'))
      }

      return {...state, filteredCountries: orderFiltered, countries: order};

      case "POST_ACTIVITY":
        return {...state, activities: [...state.activities, action.payload]};
      
      case "FILTER_BY_ACTIVITY":
        const countriesByActivity = action.payload === 'All' ? state.countries : state.countries.filter(c => c.activities.find(a => a.name === action.payload)) 
        console.log(countriesByActivity)
        return {...state, filteredCountries: countriesByActivity}
    default:
      return {...state};
  }
}
