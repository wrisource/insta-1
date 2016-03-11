import React, {
    Component,
    StyleSheet,
    View,
    ListView,
    TouchableOpacity,
    Image,
    ActivityIndicatorIOS
} from 'react-native';

import style from './styles/ios';
import Config from './config';
let styles = StyleSheet.create(style);

const refreshDistance = 40;

class List extends Component {
    constructor() {
        super();

        this.state = {
            distance: 0
        }
    }

    _handleScroll(e) {
        if (this.props.refreshable) {
            this.setState({
                distance: e.nativeEvent.contentOffset.y
            });
        }
    }

    _handleRelease() {
        if (
            this.props.refreshable &&
            !this.props.refreshingFeed &&
            this.state.distance < -refreshDistance
        ) {
            this.props.refreshData();
        }
    }

    render() {
        if (!this.props.photoList) return null;

        return (
            <View style={[{paddingTop: 45, flex: 1}]}>
                {(this.props.refreshable && this.props.refreshing) ? (
                    <View style={{
                        height: 40,
                        position: 'absolute',
                        left: 0,
                        right: 0,
                    }}>
                        <ActivityIndicatorIOS
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 30,
                                flex: 1 
                            }} />
                    </View>
                ) : null}
                <ListView
                    contentContainerStyle={[styles.list, {marginTop: 5}, (this.props.refreshable && this.props.refreshing ? {marginTop: 45} : null)]}
                    dataSource={this.props.photoList}
                    onScroll={this._handleScroll.bind(this)}
                    onResponderRelease={this._handleRelease.bind(this)}
                    renderRow={(rowData) => (
                        <TouchableOpacity onPress={this.props.selectPhoto.bind(this, rowData._id)}>
                            <Image
                                style={styles.item}
                                source={{uri: Config.api+'/public/'+(rowData.url.replace('.png', '-thumb.png'))}} />
                        </TouchableOpacity>
                    )} />
            </View>
        );
    }
}

export default List;