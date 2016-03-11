import React, {
    Component,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicatorIOS
} from 'react-native';
import style from '../styles/ios';

const styles = StyleSheet.create(style);

class Share extends Component {
    render() {
        return (
            <View style={[styles.tabContent]}>
                {this.props.shareLoading ? (
                    <ActivityIndicatorIOS
                        style={styles.loadingActivity} />
                ) : (
                    <View style={{flex: 1, paddingTop: 75, alignSelf: 'stretch'}}>
                        <View style={styles.loginInputWrapper}>
                            <TextInput
                                style={styles.loginInput}
                                onChangeText={this.props.changeNewImageDesc}
                                value={this.props.newImageDesc}
                                placeholder='Add description' />
                        </View>
                        <View style={styles.loginButtonWrapper}>
                            <TouchableOpacity
                                onPress={this.props.shareAction}
                                style={styles.btnTouchable}>
                                <Text style={styles.btnText}>Share</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        );
    }
}

export default Share;




