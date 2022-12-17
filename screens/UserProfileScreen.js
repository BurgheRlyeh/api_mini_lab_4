import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useLayoutEffect, useState} from "react";
import {addDoc, collection} from "firebase/firestore";
import {Avatar, Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome"
import { auth, db } from "../firebase";
import {AntDesign} from "@expo/vector-icons";

const UserProfileScreen = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Profile",
            // Только iOS
            headerBackTitle: "Profile",
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 10 }}
                                  onPress={ navigation.goBack }>
                    <AntDesign name="arrowleft" size={24} color="white"/>
                </TouchableOpacity>
            ),
        })
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Avatar size={"xlarge"} rounded source={{ uri: auth?.currentUser?.photoURL }}/>
            <Text>{auth?.currentUser?.displayName}</Text>
            <Text>{auth?.currentUser?.email}</Text>
        </View>
    )
}

export default UserProfileScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
        height: "100%",
    }
})