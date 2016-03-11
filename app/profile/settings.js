import React, {
    Component,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import style from '../styles/ios.js';
let styles = StyleSheet.create(style);

class Settings extends Component {
    render() {
        return (
            <View style={[styles.tabContent, { marginTop: 75 }]}>
                <Text>{this.props.user}</Text>
                <View style={styles.loginButtonWrapper}>
                    <TouchableOpacity
                        onPress={this.props.signOut}
                        style={styles.btnTouchable}>
                        <Text style={styles.btnText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Settings;