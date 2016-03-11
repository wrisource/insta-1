'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    TabBarIOS,
    ListView,
    Text,
    View,
} from 'react-native';
import { 
    UIImagePickerManager,
    PhotoEditor 
} from 'NativeModules';
import Icon from 'react-native-vector-icons/Ionicons';
import style from './styles/ios.js';
import AddPhotoTab from './addPhoto/index';
import ProfileTab from './profile/index';
import FeedTab from './feed/index';
import Config from './config';

const styles = StyleSheet.create(style);

const defaultState = {
    selectedTab      : 'feedTab',
    selectedImage    : false,
    filterIndex      : 0,
    imagePrev        : '',
    newImageSrc      : '',
    newImageDesc     : '',
    myPhotos         : null,
    myPhotosArr      : [],
    feed             : null,
    feedArr          : [],
    shareLoading     : false,
    myPhotosSelected : null,
    feedSelected     : null,
    refreshingFeed   : false,
    filtersLoading   : false,
}


class Main extends Component {
    constructor() {
        super();

        this.state = defaultState;

        this._loadMyPhotos().done();
        this._loadFeed().done();
    }

    _getFilteredImages() {
        PhotoEditor.filters(this.state.src, (images) => {
            this.setState({
                filters   : images,
                imagePrev : images.f0
            });
        });
    }

    _cancelAddingPhoto() {
        this.setState({
            selectedImage : false,
            selectedTab   : 'feedTab',
            filterIndex   : 0,
        });
    }

    _selectFilter(index) {
        this.setState({
            filterIndex : parseInt(index),
            imagePrev   : this.state.filters[`f${index}`]
        });
    }

    _changeNewImageDesc(text) {
        this.setState({
            newImageDesc: text
        });
    }

    _profileSelectPhoto(id, cb = () => {}) {
        this.setState({
            myPhotosSelected: this.state.myPhotosArr.filter((element) => {
                return (element._id == id);
            })
        }, cb);
    }

    _feedSelectPhoto(id, cb = () => {}) {
        this.setState({
            feedSelected: this.state.feedArr.filter((element) => {
                return (element._id == id);
            })
        }, cb);
    }

    _signOut() {
        this.setState(defaultState, this.props.signOut);
    }

    _refreshFeed() {
        if (!this.state.refreshingFeed) {
            this.setState({
                refreshingFeed: true
            }, () => {
                this._loadFeed().done(() => {
                    this.setState({
                        refreshingFeed: false
                    });
                });
            });
        }
    }

    async _loadMyPhotos() {
        try {
            let response       = await fetch(Config.api+'/me'),
                parsedResponse = JSON.parse(response._bodyText);

            if (response && parsedResponse) {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

                this.setState({
                    myPhotos: ds.cloneWithRows(parsedResponse),
                    myPhotosArr: parsedResponse
                });
            }

        } catch (error) {
            console.log('Connection error: ' + error.message);
        }
    }

    async _loadFeed() {
        try {
            let response       = await fetch(Config.api+'/feed'),
                parsedResponse = JSON.parse(response._bodyText);

            if (response && parsedResponse) {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

                this.setState({
                    feed: ds.cloneWithRows(parsedResponse),
                    feedArr: parsedResponse
                });
            }

        } catch (error) {
            console.log('Connection error: ' + error.message);
        }
    }

    _shareAction(callback = () => {}) {
        this.setState({ shareLoading: true }, () => {
            PhotoEditor.process(this.state.newImageSrc, this.state.filterIndex.toString(), (image) => {
                fetch(Config.api+'/upload', {
                    method: 'POST',
                    headers: {
                        'Accept'       : 'application/json',
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        image : image.base64,
                        thumb : image.thumb,
                        desc  : this.state.newImageDesc
                    })
                })
                .then((response) => response.text())
                .then((responseText) => {
                    this._loadMyPhotos().done(() => {
                        this.setState({
                            selectedTab    : 'profileTab',
                            selectedImage  : false,
                            filterIndex    : 0,
                            imagePrev      : '',
                            newImageSrc    : '',
                            newImageDesc   : '',
                            shareLoading   : false,
                            filtersLoading : false
                        }, () => {
                            callback();
                        })
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
            });
        });
        
    }

    render() {
        return (
            <TabBarIOS>
                <Icon.TabBarItem
                    title=""
                    iconName="ios-list-outline"
                    selectedIconName="ios-list-outline"
                    selected={this.state.selectedTab === 'feedTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'feedTab'
                        });
                    }}>
                    <FeedTab
                        feed={this.state.feed}
                        feedSelected={this.state.feedSelected}
                        feedSelectPhoto={this._feedSelectPhoto.bind(this)}
                        refreshingFeed={this.state.refreshingFeed}
                        refreshFeed={this._refreshFeed.bind(this)} />
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title=""
                    iconName="ios-camera-outline"
                    selectedIconName="ios-camera-outline"
                    selected={this.state.selectedTab === 'addPhotoTab'}
                    onPress={() => {
                        if (!this.state.selectedImage) {
                            UIImagePickerManager.showImagePicker(Config.imagePicker, (response) => {
                                if (response.didCancel) {
                                    console.log('User cancelled image picker');
                                } else if (response.error) {
                                    console.log('UIImagePickerManager Error: ', response.error);
                                } else {
                                    let source = { uri: response.uri.replace('file://', ''), isStatic: true };

                                    this.setState({
                                        selectedTab    : 'addPhotoTab',
                                        selectedImage  : true,
                                        filterIndex    : 0,
                                        filtersLoading : true
                                    }, () => {
                                        PhotoEditor.filters(source.uri, (images) => {
                                            this.setState({
                                                filters        : images,
                                                imagePrev      : images.f0,
                                                newImageSrc    : source.uri,
                                                filtersLoading : false
                                            });
                                        });
                                    });
                                }
                            });
                        } else {
                            this.setState({
                                selectedTab: 'addPhotoTab'
                            });
                        }
                    }}>
                    <AddPhotoTab
                        imagePrev={this.state.imagePrev}
                        cancelAddingPhoto={this._cancelAddingPhoto.bind(this)}
                        filterIndex={this.state.filterIndex}
                        selectFilter={this._selectFilter.bind(this)}
                        newImageDesc={this.state.newImageDesc}
                        changeNewImageDesc={this._changeNewImageDesc.bind(this)}
                        shareAction={this._shareAction.bind(this)}
                        shareLoading={this.state.shareLoading}
                        filters={this.state.filters}
                        filtersLoading={this.state.filtersLoading}
                        goToProfile={() => {
                            this.setState({
                                selectedTab: 'profileTab',
                                selectedImage: null,
                            });
                        }} />
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title=""
                    iconName="ios-person-outline"
                    selectedIconName="ios-person-outline"
                    selected={this.state.selectedTab === 'profileTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'profileTab',
                            reloadProfile: false
                        });
                    }}>
                    <ProfileTab
                        myPhotos={this.state.myPhotos}
                        myPhotosSelected={this.state.myPhotosSelected}
                        profileSelectPhoto={this._profileSelectPhoto.bind(this)}
                        user={this.props.user.username}
                        signOut={this._signOut.bind(this)} />
                </Icon.TabBarItem>
            </TabBarIOS>
        );
    }
};

export default Main;