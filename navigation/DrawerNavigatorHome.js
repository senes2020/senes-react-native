import React, { useState, useEffect } from 'react'
import TelaHomeCompanheiro from "../components/home/HomeCompanheiro";
import TelaHomeBeneficiario from "../components/home/HomeBeneficiario";
import { Icon } from 'react-native-elements'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";

const DrawerNav = ({route, navigation}) => {

    //Recebe o ID do usuário logado
    //e envia como parâmetro para as telas
    //Assim como a tela inicial que deve ser exibida
    const {idUsuarioRecebido, flgDoisPerfis, telaInicial} =  route.params;

    const inicialRoute = telaInicial == 'beneficiario' ? 'Dados de Beneficiário' : 'Dados de Companheiro';

    const Drawer = createDrawerNavigator();

    //Função para ressetar essa nevagação 
    //e voltar para o Stack
    const retornarMenu = () => {

        navigation.navigate('SignedOutNavigator', {
            screen: 'Index',
            params: {},
        });
    }

    return (
      
        <Drawer.Navigator initialRouteName={inicialRoute} drawerContent={props => {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem label="Voltar para o menu" onPress={retornarMenu}
                icon={({ focused, color, size }) => <Icon name='exit-to-app' type='material' size={30} color="#005E80" />} 
                />
            </DrawerContentScrollView>
            )
        }}>
          <Drawer.Screen 
            name="Meus Dados"  
            initialParams={{ idUsuarioRecebido: idUsuarioRecebido }}
            component={TelaHomeCompanheiro} 
            options={{
                drawerIcon: config => <Icon
                    size={30}
                    name='user-edit'
                    type='font-awesome-5'
                    color="#005E80"></Icon>
            }}
          />
          {flgDoisPerfis || telaInicial == 'beneficiario' ?
          <Drawer.Screen 
            name="Dados de Beneficiário" 
            component={TelaHomeBeneficiario}  
            initialParams={{ idUsuarioRecebido: idUsuarioRecebido, flgDoisPerfis: flgDoisPerfis }}
            options={{
                drawerIcon: config => <Icon
                    size={30}
                    name='human-greeting'
                    type='material-community'
                    color="#005E80"></Icon>
            }}
          />
          : null}
          {flgDoisPerfis || telaInicial == 'companheiro' ?
            <Drawer.Screen 
                name="Dados de Companheiro" 
                component={TelaHomeCompanheiro}  
                initialParams={{ idUsuarioRecebido: idUsuarioRecebido, flgDoisPerfis: flgDoisPerfis }}
                options={{
                    drawerIcon: config => <Icon
                        size={30}
                        name='work'
                        type='material'
                        color="#005E80"></Icon>
                }}
            /> 
          : null}
        </Drawer.Navigator>
      
    );
  }

export default DrawerNav