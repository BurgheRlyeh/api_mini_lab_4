import {StyleSheet, View} from "react-native";
import React, { useState, useEffect } from "react";
import {Button, Image, Input} from "react-native-elements"
import {StatusBar} from "expo-status-bar";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase"

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toRegister = () => { navigation.navigate("Register"); }
    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .catch(error => alert(error.message));
    }

    useEffect(() => {
        return auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if (authUser) {
                auth.updateCurrentUser = authUser;
                navigation.replace("Home");
            }
        });
        }, []);

    return (
        <View style={ styles.container }>
            <StatusBar style="light"/>
            <Image source={{ uri: "https://play-lh.googleusercontent.com/yNLrKzTLtlw6mzEhNr0wxAHYMYtTu-K9PKXC_pvahCdv0Cl2WgLENPwgMWUyDeSYFow" }}
                   style = {{width: 100, height: 100}}/>
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autoFocus type="email" value={email}
                       onChangeText={ (text) => setEmail(text)}/>
                <Input placeholder="Password" secureTextEntry type="password" value={password}
                       onChangeText={ (text) => (setPassword(text))} onSubmitEditing={signIn}/>
            </View>
            <Button
                color="secondary"
                containerStyle={styles.button}
                onPress={signIn}
                title='Login'
            />
            <Button
                color="secondary"
                containerStyle={styles.button}
                onPress={toRegister}
                type="outline"
                title='Register'
            />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: 'white',
    },
});
