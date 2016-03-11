import React, {
    Component,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Navigator
} from 'react-native';

import style from '../styles/ios';
import Config from '../config';
import List from '../photoListView';
import Photo from '../photoView';
import Icon from 'react-native-vector-icons/Ionicons';

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
        return null;
    },

    Title: function(route, navigator, index, navState) {
        if (index === 1) return null;

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
            case 'Feed':
                return (
                    <View style={{marginTop: 20, flex: 1}}>
                        <List
                            photoList={this.props.feed}
                            navigator={navigator}
                            selectPhoto={(id) => {
                                this.props.feedSelectPhoto(id, () => {
                                    navigator.push({ title: 'Photo' })
                                });
                            }}
                            refreshable={true}
                            refreshing={this.props.refreshingFeed}
                            refreshData={this.props.refreshFeed}
                            route={route} />
                    </View>
                );

                return (
                    <View />
                );

                break;

            case 'Photo':
                return (
                    <Photo
                        navigator={navigator}
                        route={route}
                        photo={this.props.feedSelected[0]}
                        user={this.props.feedSelected[0].uploadedBy.username} />
                );

                break;
        }
    }

    render() {
        return (
            <Navigator
                ref='nav'
                initialRoute={{
                    title: 'Feed',
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
