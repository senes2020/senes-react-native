import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SignedInNavigator from "./SignedIn";
import SignedOutNavigator from "./SignedOut";

const Stack = createStackNavigator();

export default function Routes() {

  //Definindo logado como false
  //Dessa forma, será encaminhado primeiramente para as telas de quando nao esta logado
  //SignedInNavigator -> componente com as telas em estado "autenticado"
  //SignedOutNavigator -> componente com as telas sem o "autenticado"
  const signedIn = false;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={signedIn ? "SignedInNavigator" : "SignedOutNavigator"}>
        <Stack.Screen
          name="SignedOutNavigator"
          component={SignedOutNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="SignedInNavigator" 
          component={SignedInNavigator}
          options={{
            headerShown: false,
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}