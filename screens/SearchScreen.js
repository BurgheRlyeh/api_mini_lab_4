import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {auth, db} from "../firebase";
import {Avatar, Input} from "react-native-elements";
import {AntDesign, FontAwesome, Ionicons, SimpleLineIcons} from "@expo/vector-icons"
import { collection, onSnapshot, where, query } from "firebase/firestore";
import ChatListItem from "../components/ChatListItem";
import {defaultPicURL} from "../utils";
import Icon from "react-native-vector-icons/FontAwesome";

const SearchScreen = ({ navigation }) => {
    const [search, setSearch] = useState('')
    const [chats, setChats] = useState([]);

    const updateChats = () => {
        console.log("updateChats");
        const q = query(collection(db, "chats"), where("chatName", '!=', ""));
        return onSnapshot(q, (querySnapshots) => {
            const chats = [];
            console.log("search = " + search);
            querySnapshots.forEach((doc) => {
                if (doc.data().chatName.toString().includes(search)) {
                    chats.push({
                        id: doc.id,
                        data: doc.data()
                    });
                }
            });
            console.log(chats);
            setChats(chats);
        });
    }
    updateChats()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Search chat",
            headerTitleAlign: "left",
            // Только iOS
            headerBackTitleVisible: false,
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 10 }}
                                  onPress={ navigation.goBack }>
                    <AntDesign name="arrowleft" size={24} color="white"/>
                </TouchableOpacity>
            )
        })
    }, [navigation]);

    // Переходим на экран чата; при этом передаем id и name выбранного чата,
    // чтобы на экране чата отобразить нужное содержимое
    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {id, chatName,})
    }

    return (
        <View style={{
            flexDirection: "row",
            // alignItems: "center",
        }}>
            <ScrollView style={styles.container}>
                <Input placeholder="Search" autoFocus tupe="text" value={search}
                       onChangeText={ (text) => {
                           setSearch(text);
                           updateChats();
                           console.log("search = " + search);
                       }}
                />
                <ScrollView style={styles.container}>
                    {chats.map( ({id, data: { chatName }}) => (
                        <ChatListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                    ))}
                </ScrollView>
            </ScrollView>
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
})