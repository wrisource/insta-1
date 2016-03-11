import React, {
    Component,
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import style from './styles/ios';
import Config from './config';

const styles = StyleSheet.create(style);

class PhotoView extends Component {
    render() {
        return (
            <View style={[styles.tabContent, {paddingTop: 75}]}>
                <Image
                    source={{uri: Config.api+'/public/'+this.props.photo.url}}
                    style={styles.imagePreview} />
                <View style={styles.imagePreviewDescWrap}>
                    <Text style={styles.imagePreviewUser}>
                        {this.props.user}
                    </Text>
                    <Text style={styles.imagePreviewDesc}>
                        {this.props.photo.desc}
                    </Text>
                </View>
            </View>
        );
    }
}

export default PhotoView;