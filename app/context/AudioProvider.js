import React, { Component, createContext } from 'react';
import { Text, View, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export const AudioContext = createContext();

export class AudioProvider extends Component {
    constructor(props){
        super(props)
        this.state = {
            audioFiles: [],
            permissionError: false
        }
    }

    permissionAlert = () => {
        Alert.alert("Permission Required", "This app needs to read audio files!", [{
            text: "Enable",
            onPress: () => this.getPermission()
        },{
            text: "Cancel",
            onPress: () => this.permissionAlert()
        }])
    }

    getAudioFiles = async () => {
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
        })
        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount,
        })

        this.setState({...this.state, audioFiles: media.assets})
    }

    getPermission = async () => {
        const permission = await MediaLibrary.getPermissionsAsync();
        if(permission.granted){
            this.getAudioFiles()
        }

        if(!permission.canAskAgain && !permission.granted){
            this.setState({ ...this.state, permissionError: true});
        }

        if(!permission.granted && permission.canAskAgain){
            const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
            if(status == 'denied' && canAskAgain){
                this.permissionAlert()
            }
            if(status == 'granted'){
                this.getAudioFiles()
            }
            if(status == 'denied' && !canAskAgain){
                this.setState({...this.state, permissionError: true})
            }
        }

    }

    componentDidMount(){
        this.getPermission()
    }

    render() {
        if(this.state.permissionError) return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text style={{fontSize: 25, textAlign: 'center', color: 'red'}}>Please enable file access.</Text>
        </View>
        return <AudioContext.Provider value={{audioFiles: this.state.audioFiles}}>
            {this.props.children}
        </AudioContext.Provider>
    }
}

export default AudioProvider