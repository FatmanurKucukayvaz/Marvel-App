import React, { Component } from 'react';
import { ImageBackground, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import backPic from "../assets/marvel.jpeg";
import ComicItem from "../components/ComicItem";
import service from '../services/base-service';
import Loader from '../components/Loader';
class Comics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      comics: [],
      allComics: [],
      searchText: ""
    }
  }

  componentDidMount() {
    service.getData(`comics`).then(res=>{
        this.setState({comics: res.data.data.results, allComics: res.data.data.results, loading: false});
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

  renderComics = () => {
      return this.state.comics.map((comic, i) => {
        return <TouchableOpacity key={i} onPress={()=> this.props.navigation.navigate('ComicDetail', {id: comic.id})}>
        <ComicItem url={comic.thumbnail.path+"/portrait_medium."+comic.thumbnail.extension} title={comic.title} desc={comic.description} pageCount={comic.pageCount}></ComicItem>
        </TouchableOpacity>
      })
  }

  search = (e) => {
    this.setState({searchText: e});
    let array = [];
    if(e.trim()!=""){
        this.state.allComics.filter((item, i)=>{
            let itemData = item.title;
            itemData = itemData.toLowerCase();
    
            let textData = e.toLowerCase()
            if(itemData.indexOf(textData) > -1){
              array.push(item);        
            }
          })
          this.setState({comics: array})
    } else {
        this.setState({comics: this.state.allComics})
    }
  }

  render() {
    return (
        <ImageBackground style={{flex: 1, resizeMode: 'cover', justifyContent: "center", alignItems: "center"}} source={backPic}>
            <ScrollView style={{ width: "95%"}}>
            <Loader loading={this.state.loading} />
            <TextInput onChangeText={(e)=> this.search(e)} value={this.state.searchText} placeholder="Find comic with any word" style={{shadowOpacity:10, borderWidth:1, borderColor: "lightgray", borderRadius: 30, margin:5, backgroundColor:"white", opacity:0.8, marginTop:15}}></TextInput>
              {this.renderComics()}
            </ScrollView>
        </ImageBackground>
        
      );
  }
}

export default Comics;
