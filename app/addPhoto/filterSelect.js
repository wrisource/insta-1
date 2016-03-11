import React, {
    Component,
    StyleSheet,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicatorIOS
} from 'react-native';
import style from '../styles/ios';

const styles = StyleSheet.create(style);

class FilterSelect extends Component {
    render() {
        return (
            <View style={[styles.tabContent, {paddingTop: 90}]}>
                {this.props.isLoading ? (
                    <ActivityIndicatorIOS
                        style={[styles.loadingActivity, { marginTop: -90 }]} />
                ) : (
                    <View style={[styles.tabContent, {alignSelf: 'stretch'}]}>
                        <Image
                            source={{uri: `data:image/png;base64,${this.props.imagePrev}`}}
                            style={styles.imagePreview} />
                        <ScrollView
                            automaticallyAdjustContentInsets={false}
                            horizontal={true}
                            style={styles.filterSelectThumbs}>
                            <TouchableOpacity onPress={() => { this.props.selectFilter(0) }}>
                                <Image
                                    source={{uri: `data:image/png;base64,${this.props.filters.f0}`}}
                                    style={styles.filterSelectThumb} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.selectFilter(1) }}>
                                <Image
                                    source={{uri: `data:image/png;base64,${this.props.filters.f1}`}}
                                    style={styles.filterSelectThumb} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.selectFilter(2) }}>
                                <Image
                                    source={{uri: `data:image/png;base64,${this.props.filters.f2}`}}
                                    style={styles.filterSelectThumb} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.selectFilter(3) }}>
                                <Image
                                    source={{uri: `data:image/png;base64,${this.props.filters.f3}`}}
                                    style={styles.filterSelectThumb} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.selectFilter(4) }}>
                                <Image
                                    source={{uri: `data:image/png;base64,${this.props.filters.f4}`}}
                                    style={styles.filterSelectThumb} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.selectFilter(5) }}>
                                <Image
                                    source={{uri: `data:image/png;base64,${this.props.filters.f5}`}}
                                    style={styles.filterSelectThumb} />
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                )}
            </View>
        );
    }
}

export default FilterSelect;