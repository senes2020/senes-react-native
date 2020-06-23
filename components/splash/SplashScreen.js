import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Animated, Text, View, Image } from 'react-native';

const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current

  React.useEffect(() => {   
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: props.duration,
      }
    ).start();
  }, [])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

// You can then use your `FadeInView` in place of a `View` in your components:
export default ({navigation}) => {

    React.useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Index')
        }, 10000)
    })

  return (
    <View style={{flex: 1, backgroundColor: '#005E80', justifyContent: 'center'}}>
        <View style={{alignItems: 'center', justifyContent: 'space-between',flexDirection: 'row', marginLeft: 20, marginRight: 20}}>
            <FadeInView duration={5000}>
                    <Image
                        style={styles.letra_logo}
                        source={require('../../assets/logo/logo_s.png')}
                    />
            </FadeInView>
            <FadeInView duration={8000}>
                    <Image
                        style={styles.letra_logo}
                        source={require('../../assets/logo/logo_e.png')}
                    />
            </FadeInView>
            <FadeInView duration={9000}>
                    <Image
                        style={styles.letra_logo}
                        source={require('../../assets/logo/logo_n.png')}
                    />
            </FadeInView>
            <FadeInView duration={8000}>
                    <Image
                        style={styles.letra_logo}
                        source={require('../../assets/logo/logo_e2.png')}
                    />
            </FadeInView>
            <FadeInView duration={5000}>
                    <Image
                        style={styles.letra_logo}
                        source={require('../../assets/logo/logo_s2.png')}
                    />
            </FadeInView>
        </View>
        
        <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 50}}>
            <FadeInView duration={10000}>
                <Image
                    style={styles.slogan}
                    source={require('../../assets/logo/logo_slogan.png')}
                />
            </FadeInView>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    letra_logo: {
        height: 30, 
        resizeMode: "contain"
    },
    slogan: {
        height: 60,
        resizeMode: "contain"
    }
})
