import {Button, StyleSheet, Text, View} from "react-native";
import React, {useLayoutEffect, useState} from "react";
import {addDoc, collection} from "firebase/firestore";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome"
import { auth, db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            // Только iOS
            headerBackTitle: "Chats",

        })
    }, [navigation]);

    const createChat = () => {
        const docRef = addDoc(collection(db, "chats"),{
            chatName: input
        }).then(() => {
            navigation.goBack();
        }).catch((error) => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <Input placeholder='Enter a chat name' value={input}
                   onChangeText={(text) => setInput(text)}
                   leftIcon={
                       <Icon name="wechat" type="antdesign" size={24} color="black"/>
                   }
            />
            <Button disabled={!input} onPress={createChat} title="Create new chat" />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    }
})