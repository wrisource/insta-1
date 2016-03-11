import React, {
    Component,
    StyleSheet,
    Navigator,
    Text,
    TouchableOpacity
} from 'react-native';
import style from '../styles/ios';
import SelectFilter from './filterSelect';
import Share from './share';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create(style);

const NavigationBarRouteMapper = {
    LeftButton: function(route, navigator, index, navState) {
        if (index === 0) {
            return (
                <TouchableOpacity
                    onPress={route.props.cancelAddingPhoto}
                    style={styles.navBarLeftButton}>
                    <Text style={[styles.navBarText, styles.navBarButtonText]}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            );
        } else {
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
        }
    },

    RightButton: function(route, navigator, index, navState) {
        let nextRoute = (route.title === 'Filter' ? { title: 'Share' } : {})

        if (index === 1) {
            return null
        }

        return (
            <TouchableOpacity
                onPress={() => navigator.push(nextRoute)}
                style={styles.navBarRightButton}>
                <Text style={[styles.navBarText, styles.navBarButtonText]}>
                    Next
                </Text>
                <Icon name="ios-arrow-forward" size={30} style={[styles.navBarButtonIcon, styles.navBarButtonIconRight]}/>
            </TouchableOpacity>
        );
    },

    Title: function(route, navigator, index, navState) {
        return (
            <Text style={[styles.navBarText, styles.navBarTitleText]}>
                {route.title}
            </Text>
        );
    },
};

class AddPhotoTab extends Component {

    _share() {
        this.props.shareAction(() => {
            this.refs.nav.popToTop()
        });
    }

    _renderScene(route, navigator) {
        switch (route.title) {
            case "Filter":
                return (
                    <SelectFilter
                        imagePrev={this.props.imagePrev}
                        filterIndex={this.props.filterIndex}
                        selectFilter={this.props.selectFilter}
                        filters={this.props.filters}
                        isLoading={this.props.filtersLoading}
                        navigator={navigator}
                        route={route} />
                );

                break;

            case "Share":
                return (
                    <Share
                        newImageDesc={this.props.newImageDesc}
                        changeNewImageDesc={this.props.changeNewImageDesc}
                        shareAction={this._share.bind(this)}
                        shareLoading={this.props.shareLoading}
                        navigator={navigator}
                        route={route} />
                );

                break;
        }
    }

    render() {
        return (
            <Navigator
                ref='nav'
                initialRoute={{
                    title: 'Filter',
                    component: SelectFilter,
                    type: "right",
                    leftButtonTitle: 'Cancel',
                    rightButtonTitle: 'Next',
                    props: {
                        cancelAddingPhoto : this.props.cancelAddingPhoto
                    },
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


export default AddPhotoTab;