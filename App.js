import React from 'react';
import Navigator from './components/Navigator'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './components/reducers/rootReducer'
import Routes from './navigation/route';
//import connect from "react-redux" 
//import { changeText } from "../actions/homeBeneficiarioActions"

const store = createStore(rootReducer);

//Descobrir como conectar o Provider aqui

export default class App extends React.Component {

  render(){
    return(
        //Componente que apresentará todos os rumos de navegação do App
        //<Provider store={store}><Navigator/></Provider>
        //<Navigator/>
        <Routes/>
    )
  }
  
}
