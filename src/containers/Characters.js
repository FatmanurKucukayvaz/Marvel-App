import React, { Component } from 'react';
import { ImageBackground, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import backPic from "../assets/marvel.jpeg";
import CharacterItem from "../components/CharacterItem";
import service from '../services/base-service';
import Loader from '../components/Loader';
class Characters extends Component {
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
    service.getData(`characters`).then(res=>{
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

  renderCharacters = () => {
      return this.state.characters.map((character, i) => {
        return <TouchableOpacity key={i} onPress={()=>this.props.navigation.navigate('CharacterDetail', {id: character.id})}>
        <CharacterItem url={character.thumbnail.path+"/portrait_medium."+character.thumbnail.extension} name={character.name} desc={character.description} comicCount={character.comics.available} storyCount={character.stories.available}></CharacterItem>
        </TouchableOpacity>
      })
  }

  search = (e) => {
    this.setState({searchText: e});
    let array = [];
    if(e.trim()!=""){
        this.state.allCharacters.filter((item, i)=>{
            let itemData = item.name;
            itemData = itemData.toLowerCase();
    
            let textData = e.toLowerCase()
            if(itemData.indexOf(textData) > -1){
              array.push(item);        
            }
          })
          this.setState({characters: array})
    } else {
        this.setState({characters: this.state.allCharacters})
    }
  }

  render() {
    return (
        <ImageBackground style={{flex: 1, resizeMode: 'cover', justifyContent: "center", alignItems: "center"}} source={backPic}>
            <ScrollView style={{ width: "95%"}}>
            <Loader loading={this.state.loading} />
            <TextInput onChangeText={(e)=> this.search(e)} value={this.state.searchText} placeholder="Find character with any word" style={{shadowOpacity:10, borderWidth:1, borderColor: "lightgray", borderRadius: 30, margin:5, backgroundColor:"white", opacity:0.8, marginTop:15}}></TextInput>
                {this.renderCharacters()}
            </ScrollView>
        </ImageBackground>
        
      );
  }
}

export default Characters;
