import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

class ComicItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      items: {},
      year:null,
      month:null,
      day:null
    }
  }

  render() {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop:10, marginBottom:10, marginLeft:5, marginRight:5, flexDirection:"row", borderRadius: 30,backgroundColor:"white",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation:10,}}>
            <View style={{flex:3, flexDirection: "column", marginLeft:20, marginTop:10, marginBottom:10}}>
                <Image source={{uri :this.props.url}} style={{width: 100, height: 150}}></Image>
            </View>
            <View style={{flex:5, flexDirection: "column", marginTop:10, marginBottom:10}}>
                <Text style={{fontWeight:"bold", color:"black"}}>{this.props.title}</Text>
                <Text style={{}}>{this.props.desc}</Text>
                <Text style={{}}>{this.props.pageCount} pages</Text>
            </View>
        </View>
      );
  }
}

export default ComicItem;
