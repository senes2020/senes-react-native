//Recursos do React/React Native
import React, { useState } from 'react'
import { StyleSheet, View, Image, Text} from 'react-native'

const CurativosAvaliacao = (props) => {

    //Capturando o valor passado de avaliacao
    //e setando as variáveis 
    const nota = props.avaliacao
    const notaInteira = Math.floor(nota)
    const notaDecimal = (nota - notaInteira) / 0.5
    const notasVazias = 5 - notaInteira - (nota - notaInteira)

    //Criação de arrays de componentes
    let arrayInteiros = []
    let arrayMetade = []
    let arrayVazio = []

    //Realizando lógica e inserção de componentes para os 3 tipos de situação
    for(var i = 1; i <= notaInteira; i++){
        arrayInteiros.push(
                <Image
                    style={styles.image_avaliacao}
                    source={require('../../assets/icons/curativo_completo.png')}
                />
        )
    }

    for(var i = 1; i <= notaDecimal; i++){
        arrayMetade.push(
                <Image
                    style={styles.image_avaliacao}
                    source={require('../../assets/icons/curativo_metade.png')}
                />
        )
    }

    for(var i = 1; i <= notasVazias; i++){
        arrayVazio.push(
                <Image
                    style={styles.image_avaliacao}
                    source={require('../../assets/icons/curativo_vazio.png')}
                />
        )
    }

    return (
        <View style={styles.container_avaliacao}>
            {arrayInteiros.map((componente) => {
                return componente
            })}
            {arrayMetade.map((componente) => {
                return componente
            })}
            {arrayVazio.map((componente) => {
                return componente
            })}
        </View>   
      )
}

const styles = StyleSheet.create({
    container_avaliacao: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    image_avaliacao: {
        height: 30,
        width: 30,
      },
})

export default CurativosAvaliacao