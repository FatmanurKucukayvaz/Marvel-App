import React, { Component } from 'react';
import { Text, View, ImageBackground, ScrollView, Image, Linking, Alert, BackHandler } from 'react-native';
import backPic from "../assets/marvel.jpeg";
import service from '../services/base-service';
import Entypo from 'react-native-vector-icons/Entypo'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loader from '../components/Loader';

class CharacterDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      characters: [],
      allCharacters: [],
      searchText: ""
    }
  }

  componentDidMount() {
    service.getData(`characters/${this.props.route.params.id}`).then(res=>{
      this.setState({characters: res.data.data.results, allCharacters: res.data.data.results, loading: false});
    }).catch(err=>{
      this.setState({loading: false});
      Alert.alert(
        '',
        "Error",
        [{ text: "Ok" }],
        { cancelable: false }
      );
    });
  }

  render() {
    console.log("render")
    return (
        <ImageBackground style={{flex: 1, resizeMode: 'cover', justifyContent: "center", alignItems: "center"}} source={backPic}>
            <ScrollView style={{ width: "95%" }}>
            
              <Loader loading={this.state.loading} />
              {this.state.characters.length>0 ? 
              <View style={{flexDirection: "column", alignItems:"center", marginTop:20}}>
                <View style={{width: "95%", height: 282, backgroundColor: "white", alignItems: "center", justifyContent: "center", borderRadius: 10, opacity: 0.9}}>
                  <Image source={{uri : this.state.characters[0].thumbnail.path+"/portrait_xlarge."+this.state.characters[0].thumbnail.extension}} style={{width: 150, height: 225}}></Image>
                  <TouchableOpacity onPress={()=>Linking.openURL(this.state.characters[0].urls[0].url)} style={{marginTop:10}}><Text style={{fontWeight:"bold", color:"black", fontSize:20}}>Marvel Profile</Text></TouchableOpacity>

                </View>
                <View style={{width: "95%", backgroundColor: "white", alignItems: "center", justifyContent: "center", borderRadius: 10, opacity: 0.9, marginTop: 10}}>
                  <Text style={{fontWeight:"bold", color:"black", fontSize:20, marginTop: 10}}>{this.state.characters[0].name}</Text>
                  <Text>{this.state.characters[0].comics.available} comics</Text>
                  <Text>{this.state.characters[0].stories.available} stories</Text>
                  <Text>{this.state.characters[0].series.available} series</Text>
                  <Text>{this.state.characters[0].events.available} events</Text>
                  <Text style={{marginLeft: 10, marginRight: 10, marginBottom:10}}>{this.state.characters[0].description}</Text>
                </View>
                <View style={{width: "95%", backgroundColor: "white", alignItems: "flex-start", justifyContent: "flex-start", borderRadius: 10, opacity: 0.9, marginTop: 10, marginBottom:10}}>
                  <Text style={{fontWeight:"bold", color:"black", fontSize:20, marginTop: 10, alignSelf: "center"}}>Comics</Text>
                  {this.state.characters[0].comics.items.map((item, i)=>{
                    return <TouchableOpacity onPress={()=>this.props.navigation.navigate('ComicDetail', {url: item.resourceURI})} key={i} style={{flexDirection:"row", alignItems: "center", margin: 10}}>
                    <Entypo name={"book"} size={20} color={"gray"} />
                    <Text style={{fontWeight:"bold", fontSize:20, margin: 10}}>{item.name}</Text>
                  </TouchableOpacity>
                  })}
                </View>
              </View>
              : null }

            </ScrollView>
        </ImageBackground>
        
      );
  }
}

export default CharacterDetail;
