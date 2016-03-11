import React, {
    Component,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Navigator
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import style from '../styles/ios';
import Config from '../config';
import List from '../photoListView';
import Photo from '../photoView';
import Settings from './settings';

let styles = StyleSheet.create(style);

const NavigationBarRouteMapper = {
    LeftButton: function(route, navigator, index, navState) {
        if (index === 0) return null;
 
        let previousRoute = navState.routeStack[index - 1];

        return (
            <TouchableOpacity
                onPress={() => navigator.pop()}
                style={styles.navBarLeftButton}>
                <Icon name="ios-arrow-back" size={30} style={styles.navBarButtonIcon}/>
                <Text style={[styles.navBarText, styles.navBarButtonText]}>
                    {previousRoute.title}
                </Text>
            </TouchableOpacity>
        );
    },

    RightButton: function(route, navigator, index, navState) {
        if (index !== 0) return null;

        return (
            <TouchableOpacity
                onPress={() => navigator.push({title: 'Settings'})}
                style={styles.navBarRightButton}>
                <Text style={[styles.navBarText, styles.navBarButtonText, {marginTop: 5}]}>
                    <Icon name='ios-gear-outline' size={30} />
                </Text>
            </TouchableOpacity>
        );
    },

    Title: function(route, navigator, index, navState) {
        if (route.title === 'Photo') return null;

        return (
            <Text style={[styles.navBarText, styles.navBarTitleText]}>
                {route.title}
            </Text>
        );
    },
};


class ProfileTab extends Component {
    _renderScene(route, navigator) {
        switch (route.title) {
            case 'My Profile':
                return (
                    <List
                        photoList={this.props.myPhotos}
                        navigator={navigator}
                        selectPhoto={(id) => {
                            this.props.profileSelectPhoto(id, () => {
                                navigator.push({ title: 'Photo' })
                            });
                        }}
                        route={route} />
                );

                break;

            case 'Photo':
                return (
                    <Photo
                        navigator={navigator}
                        route={route}
                        photo={this.props.myPhotosSelected[0]}
                        user={this.props.user} />
                );

                break;

            case 'Settings':
                return (
                    <Settings
                        navigator={navigator}
                        route={route}
                        signOut={this.props.signOut}
                        user={this.props.user} />
                );

                break;
        }
    }

    render() {
        return (
            <Navigator
                ref='nav'
                initialRoute={{
                    title: 'My Profile',
                    component: List,
                    type: "right",
                }}
                renderScene={this._renderScene.bind(this)}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={NavigationBarRouteMapper}
                        style={styles.navBar} />
                } />
            
        );
    }
}



export default ProfileTab;
