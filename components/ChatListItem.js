import {StyleSheet, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Avatar, ListItem} from 'react-native-elements';
import {defaultPicURL} from '../utils';
import {collection, limit, onSnapshot, orderBy, query} from 'firebase/firestore';
import {db} from '../firebase';

// Элемент списка чатов
// В props принимается id чата, название и функцию-коллбэк обработки нажатия на этот элемент
const ChatListItem = ({ id, chatName, enterChat }) => {
    const [lastMessage, setLastMessage] = useState({});

    useEffect(() => {
        const q = query(collection(db, "chats", id, "messages"),
            orderBy("timestamp", "desc"), limit(1));
        return onSnapshot(q, (querySnapshots) => {
            const messages = [];
            querySnapshots.forEach((doc) => {
                messages.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            setLastMessage(messages[0]);
            console.log(messages);
        });
    }, []);

    return (
        <TouchableOpacity>
            <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
                <Avatar rounded source={{
                    uri: lastMessage?.data?.photoUrl || defaultPicURL //chatMessages?.[0]?.photoUrl ||
                }}/>
                <ListItem.Content>
                    <ListItem.Title numberOfLines={1} style={{fontWeight: "800"}}>
                        {chatName}
                    </ListItem.Title>
                    <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                        {lastMessage?.data?.displayName} : {lastMessage?.data?.message}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>

    )
}

export default ChatListItem

const styles = StyleSheet.create({})