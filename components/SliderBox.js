import React, { Component } from 'react';

//Fonte: https://www.npmjs.com/package/react-native-image-slider-box
import { SliderBox } from "react-native-image-slider-box";

export default class SliderBoxComponent extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        images: [
          require('../assets/images/imagem_abertura.jpg'),
          require('../assets/images/imagem_abertura.jpg'),
          require('../assets/images/imagem_abertura.jpg'),
          require('../assets/images/imagem_abertura.jpg')
        ]
      };
    }
    
        render(){
            return(
                <SliderBox
                    images={this.state.images}
                    sliderBoxHeight={200}
                    dotColor="#005E80"
                    inactiveDotColor="#FFFFFF"
                    paginationBoxVerticalPadding={20}
                    autoplay
                    circleLoop
                />
              
            )
        }

  }
