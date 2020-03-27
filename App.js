import React from 'react';
import Navigator from './components/Navigator'
import TelaAutenticacao from './components/Autenticacao'
//import TextInputLayoutDemo from './components/InputTest'

export default class App extends React.Component {

  render(){
    return(
        //Componente que apresentará todos os rumos de navegação do App
        <Navigator />
    )
  }
  
}
