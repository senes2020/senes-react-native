import React from 'react';
import Routes from './navigation/route';

console.disableYellowBox = true;

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
