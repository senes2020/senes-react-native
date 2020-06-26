import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated, Text, View, Image } from "react-native";

export default function SplashScreen({navigation}) {
  const animS = useRef(new Animated.Value(0)).current;
  const animE = useRef(new Animated.Value(0)).current;
  const animN = useRef(new Animated.Value(0)).current;
  const animHeart = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.sequence([ 
      Animated.timing(animS, {
        toValue: 1,
        duration: 2000,
      }),
      Animated.timing(animE, {
        toValue: 1,
        duration: 2000,
      }),
      Animated.timing(animN, {
        toValue: 1,
        duration: 2000,
      }),
      Animated.timing(animHeart, {
        toValue: 1,
        duration: 3000,
      })
    ]).start();
  }, setTimeout(() => {
    navigation.navigate('Index')
}, 10000));

  return (
    <View style={{flex: 1, backgroundColor: '#005E80', justifyContent: 'center'}}>
        <View style={{alignItems: 'center', justifyContent: 'space-between',flexDirection: 'row', marginLeft: 20, marginRight: 20}}>
            <Animated.View style={{opacity: animS}}>
                    <Image
                        style={styles.letra_logo}
                        source={require('../../assets/logo/logo_s.png')}
                    />
            </Animated.View>
            <Animated.View style={{opacity: animE}}>
                    <Image
                        style={styles.letra_logo}
                        source={require('../../assets/logo/logo_e.png')}
                    />
            </Animated.View>
            <Animated.View style={{opacity: animN}}>
                    <Image
                        style={styles.letra_logo}
                        source={require('../../assets/logo/logo_n.png')}
                    />
            </Animated.View>
            <Animated.View style={{opacity: animE}}>
                    <Image
                        style={styles.letra_logo}
                        source={require('../../assets/logo/logo_e2.png')}
                    />
            </Animated.View>
            <Animated.View style={{opacity: animS}}>
                    <Image
                        style={styles.letra_logo}
                        source={require('../../assets/logo/logo_s2.png')}
                    />
            </Animated.View>
        </View>
        
        <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 50}}>
            <Animated.View style={{opacity: animHeart}}>
                <Image
                    style={styles.slogan}
                    source={require('../../assets/icons/heart_white.png')}
                />
            </Animated.View>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
    letra_logo: {
        height: 30, 
        resizeMode: "contain"
    },
    slogan: {
        height: 70,
        resizeMode: "contain"
    }
})
    
    
  
  


