import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView, 
  StyleSheet,
  Image} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class CardStack extends React.Component {

 
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              title:"Item 1",
              text: "Adelaide Pereira Mello",
          },
          {
              title:"Item 2",
              text: "Text 2",
          },
          {
              title:"Item 3",
              text: "Text 3",
          },
          {
              title:"Item 4",
              text: "Text 4",
          },
          {
              title:"Item 5",
              text: "Text 5",
          },
        ]
      }
    }

    _renderItem({item,index}){
        return (
          <View style={{
              backgroundColor:'red',
              borderRadius: 5,
              height: 400,
              padding: 20,
              marginLeft: 25,
              marginRight: 25, }}>

            <View style={styles.container_bio}>

              <View style={styles.container_companheiro}>
                <Image
                  style={styles.image_companheiro}
                  source={require('../../assets/icons/icone-mulher.png')}
                />
                <Text style={styles.nome_companheiro}>{item.text}</Text>
              </View>

              <TouchableOpacity
              style={styles.button_info}
              >
                <Image
                    style={styles.image_info}
                    source={require('../../assets/icons/informacoes.png')}
                />
              </TouchableOpacity>

            </View>

          </View>

        )
    }

    render() {
        return (
          <SafeAreaView style={{flex: 1  }}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"stack"}
                  layoutCardOffset={`18`}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={300}
                  itemWidth={320}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
          </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
  container_bio: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 150,
    backgroundColor: 'yellow'
  },
  container_companheiro: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  nome_companheiro: {
    color: "black",
    fontFamily: "montserrat-regular-texto",
    fontSize: 12,
    textAlign: 'center'
  },
  button_info: {
      alignSelf: "flex-end",
      height: 60,
      width: 50,
      marginTop: 10,
      marginRight: 10,
      borderColor: "transparent",
      borderWidth: 2,
      borderRadius: 60,
      justifyContent: "center"
  },
  image_info: {
      width: 50,
      resizeMode: "contain",
      alignSelf: "center"
  },
  image_companheiro: {
      width: 100,
      resizeMode: "contain",
      alignSelf: "center"
  }
})