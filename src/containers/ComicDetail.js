import React, { Component } from 'react';
import { Text, View, ImageBackground, ScrollView, Image, Linking, Alert } from 'react-native';
import backPic from "../assets/marvel.jpeg";
import service from '../services/base-service';
import Loader from '../components/Loader';
import { TouchableOpacity } from 'react-native-gesture-handler';
class ComicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      comics: [],
      allComics: [],
      searchText: "",
      characters: []
    }
  }

  componentDidMount() {
    if(this.props.route.params.id){
      service.getData(`comics/${this.props.route.params.id}`).then(async res=>{
        for(let item of res.data.data.results[0].characters.items){
          let url = item.resourceURI.split("/")
          await service.getData(`characters/${url[6]}`).then(res=>{
            let character = res.data.data.results[0]
            this.setState({characters: [...this.state.characters, character]})
          })
        }
        this.setState({comics: res.data.data.results, allComics: res.data.data.results, loading:false});
      }).catch(err=>{
        this.setState({loading: false});
        Alert.alert(
          '',
          "Error",
          [{ text: "Ok" }],
          { cancelable: false }
        );
      });
    } else if(this.props.route.params.url){
      let array = this.props.route.params.url.split("/")
      service.getData(`comics/${array[6]}`).then(async res=>{
        for(let item of res.data.data.results[0].characters.items){
          let url = item.resourceURI.split("/")
          await service.getData(`characters/${url[6]}`).then(res=>{
            let character = res.data.data.results[0]
            this.setState({characters: [...this.state.characters, character]})
          })
        }
        this.setState({comics: res.data.data.results, allComics: res.data.data.results, loading:false});
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
    
  }

  renderCharacter = () => {
    return this.state.characters.map((item, i)=>{
      return <TouchableOpacity key={i} onPress={()=>this.props.navigation.navigate('CharacterDetail', {id: item.id})} style={{flexDirection:"row", alignItems: "center", margin: 10}}>
        <View style={{flexDirection:"row"}}>
        <View style={{flex: 1}}>
          <Image source={{uri :item.thumbnail.path+"/portrait_small."+item.thumbnail.extension}} style={{width: 50, height: 75}}></Image>
        </View>
        <View style={{flex: 5}}>
          <Text style={{fontWeight:"bold", fontSize:20, margin: 10}}>{item.name}</Text>
          <Text style={{ fontSize:20, margin: 10}}>{item.description}</Text>
        </View>
        </View>
      </TouchableOpacity>
    })    
  }

  render() {
    return (
        <ImageBackground style={{flex: 1, resizeMode: 'cover', justifyContent: "center", alignItems: "center"}} source={backPic}>
            <ScrollView style={{ width: "95%" }}>
            <Loader loading={this.state.loading} />
              {this.state.comics.length>0 ? 
              // console.log("burda")
              <View style={{flexDirection: "column", alignItems:"center", marginTop:20}}>
                <View style={{width: "95%", height: 282, backgroundColor: "white", alignItems: "center", justifyContent: "center", borderRadius: 10, opacity: 0.9}}>
                  <Image source={{uri : this.state.comics[0].thumbnail.path+"/portrait_xlarge."+this.state.comics[0].thumbnail.extension}} style={{width: 150, height: 225}}></Image>
                  <TouchableOpacity onPress={()=>Linking.openURL(this.state.comics[0].urls[0].url)} style={{marginTop:10}}><Text style={{fontWeight:"bold", color:"black", fontSize:20}}>Marvel Profile</Text></TouchableOpacity>

                </View>
                <View style={{width: "95%", backgroundColor: "white", alignItems: "center", justifyContent: "center", borderRadius: 10, opacity: 0.9, marginTop: 10, padding:10}}>
                  <Text style={{fontWeight:"bold", color:"black", fontSize:20}}>{this.state.comics[0].title}</Text>
                  <Text>{this.state.comics[0].pageCount} pages</Text>
                  <Text>{this.state.comics[0].description}</Text>
                </View>
                <View style={{width: "95%", backgroundColor: "white", alignItems: "center", justifyContent: "center", borderRadius: 10, opacity: 0.9, marginTop: 10, marginBottom:10, padding:10}}>
                  <Text style={{fontWeight:"bold", color:"black", fontSize:20, marginTop: 10}}>Creators</Text>
                  {this.state.comics[0].creators.items.map((item, i)=>{
                    return <Text key={i}>{item.name}, {item.role} </Text>
                  })}
                </View>
                <View style={{width: "95%", alignItems: "flex-start", justifyContent: "flex-start", borderRadius: 10, opacity: 0.9, marginTop: 10, marginBottom:10, backgroundColor: "white"}}>
                  <Text style={{fontWeight:"bold", color:"black", fontSize:20, marginTop: 10, alignSelf: "center"}}>Characters</Text>
                  {this.renderCharacter()}
                </View>
              </View>
              : null }

            </ScrollView>
        </ImageBackground>
      );
  }
}

export default ComicDetail;
