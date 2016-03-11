'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    ActivityIndicatorIOS
} from 'react-native';

import style from './styles/ios';
import Main from './main';
import Config from './config'

const styles = StyleSheet.create(style);
const STORAGE_KEY = '@Insta:user';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            login    : '',
            password : '',
            logged   : false,
            user     : {},
            loading  : true
        }

        this._checkUser().done((user) => {
            if (user) {
                this._logUser(user.login, user.password).done((response) => {
                    if (response && response._bodyText) {
                        let respObj = JSON.parse(response._bodyText);

                        if (respObj.logged) {
                            this.setState({
                                user: respObj.user,
                                logged: true,
                                loading: false
                            });
                        } else {
                            this.setState({
                                loading: false
                            });
                        }
                    } else {
                        this.setState({
                            loading: false
                        });
                    }
                });
            } else {
                this.setState({
                    loading: false
                });
            }
        });

        
    }

    async _logUser(login, password) {
        try {
            let response = await fetch(Config.api+'/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: login,
                    password: password,
                })
            });

            return response;
        } catch (error) {
            console.log('Login error: ' + error.message);
        }
    }

    async _checkUser() {
        try {
            let user = await AsyncStorage.getItem(STORAGE_KEY);

            if (user !== null) {
                user = JSON.parse(user);

                if (user.login && user.password) {
                    return {
                        login    : user.login,
                        password : user.password
                    }
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    async _storeUser(login, password) {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
                login    : login,
                password : password
            }));
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    _signOut() {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({}));

        this.setState({
            login    : '',
            password : '',
            logged   : false,
            user     : {}
        });
    }

    _signInPress() {
        this.setState({
            loading: true
        });

        this._logUser(this.state.login, this.state.password)
            .done((response) => {
                if (response && response._bodyText) {
                    let respObj = JSON.parse(response._bodyText);

                    if (respObj.logged) {
                        this._storeUser(this.state.login, this.state.password).done(() => {
                            this.setState({
                                user: respObj.user,
                                logged: true,
                                loading: false
                            })
                        });
                    } else {
                        this.setState({
                            loading: false
                        });
                    }
                } else {
                    this.setState({
                        loading: false
                    });
                }
            });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.loading ? (
                    <ActivityIndicatorIOS
                        style={styles.loadingActivity} />
                ) : (
                    <View style={{ flex: 1, alignSelf: 'stretch' }}>
                        {this.state.logged ? (
                            <Main
                                user={this.state.user}
                                signOut={this._signOut.bind(this)} />
                        ) : (
                            <View style={styles.loginContainer}>
                                <View style={styles.loginInputWrapper}>
                                    <TextInput
                                        style={styles.loginInput}
                                        onChangeText={(text) => this.setState({ login: text })}
                                        value={this.state.login}
                                        placeholder='Login'
                                        autoCorrect={false}
                                        autoCapitalize={'none'} />
                                </View>

                                <View style={styles.loginInputWrapper}>
                                    <TextInput
                                        style={styles.loginInput}
                                        onChangeText={(text) => this.setState({ password: text })}
                                        value={this.state.password}
                                        placeholder='Password'
                                        autoCorrect={false}
                                        secureTextEntry={true} />
                                </View>

                                <View style={styles.loginButtonWrapper}>
                                    <TouchableOpacity
                                        onPress={this._signInPress.bind(this)}
                                        style={styles.btnTouchable}>
                                        <Text style={styles.btnText}>Sign In!</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                )}
                
            </View>
        );
    }
}

export default Login;