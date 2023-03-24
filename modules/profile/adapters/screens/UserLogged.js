import { StyleSheet, Text, View } from 'react-native'
import { Button, Avatar } from '@rneui/base'
import React, { useEffect, useState } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../../../kernel/components/Loading'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { getAuth, updateProfile } from 'firebase/auth'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library';
// import { doc, setDoc, getFirestore } from "firebase/firestore";
import AccountOptions from './AccountOptions'
import { get } from 'lodash'

export default function UserLogged(props) {
    const [auth, setAuth] = useState(getAuth())
    const [reload, setReload] = useState(false)
    useEffect(()=>{
        setAuth(getAuth())
        console.log('ejecuta el effect')
        setReload(false)
    },[reload])
    // const { setReload, user } = props
    // console.log('currentUser', auth.currentUser);
    const { user } = props
    // console.log('Sesión', user);
    const [show, setShow] = useState(false)
    const [text, setText] = useState('')
    // const removeValue = async () => {
    //     setText('Cerrando sesión')
    //     try {
    //         setShow(true)
    //         await AsyncStorage.removeItem('@session')
    //         setShow(false)
    //         setReload(true)
    //     } catch (e) {
    //         setShow(false)
    //         console.log('Error - UserLogged(12)', e);
    //     }
    // }

    const uploadImage = async (uri) => {
        setText('Cambiando avatar')
        setShow(true)
        const response = await fetch(uri) //genera un blob
        console.log('Uri response', response);
        const { _bodyBlob } = response
        const storage = getStorage()
        const storageRef = ref(storage, `avatar/${user.uid}`)
        return uploadBytes(storageRef, _bodyBlob)
    }

    const changeAvatar = async () => {
        const {status} = await MediaLibrary.requestPermissionsAsync()
        if (status !== 'denied') {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1
            })
            if (!result.canceled) {
                uploadImage(result.assets[0].uri).then((response) => {
                    console.log('Imagen actualizada')
                    uploadPhotoProfile()
                }).catch((err) => {
                    console.log('Error', err)
                })
            } else {
                console.log('Imagen no seleccionada');
                setShow(false)
            }
        }
    }

    const uploadPhotoProfile = () => {
        const storage = getStorage()
        getDownloadURL(ref(storage, `avatar/${user.uid}`))
            .then((url) => {
                updateProfile(auth.currentUser, {
                    photoURL: url
                })
                    .then(() => {
                        setShow(false)
                    })
                    .catch((err) => {
                        setShow(false)
                        console.log('Fallo', err);
                    })
            }).catch((err) => {
                setShow(false)
                console.log('Error obtener Imagen', err);
            })
    }

    return (
        <View style={styles.container}>
            {user && (
                <View style={styles.infoContainer}>
                    <Avatar
                        size='xlarge'
                        rounded
                        source={{ uri: `${auth.currentUser.photoURL}` }}
                        containerStyle={styles.avatar}
                    >
                        <Avatar.Accessory
                            size={50}
                            onPress={changeAvatar}
                        />
                    </Avatar>
                    <View>
                        <Text style={styles.displayName}>
                            {auth.currentUser.displayName ? auth.currentUser.displayName : 'Anónimo'}
                        </Text>
                        <Text>
                            {auth.currentUser.email}
                        </Text>
                    </View>
                </View>
            )}
            <AccountOptions setReload={setReload}/>
            <View style={styles.btnContainer}>
                <Button
                    title='Cerrar sesión'
                    buttonStyle={styles.btn}
                    onPress={() => {
                        setText('Cerrando sesión')
                        return auth.signOut()
                    }}
                />
            </View>
            <Loading show={show} text={text} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        backgroundColor: '#FFF'
    },
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        marginTop: 30,
        backgroundColor: 'tomato',
        paddingVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        width: 250
    },
    infoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 30
    },
    avatar: {
        marginRight: 16
    },
    displayName: {
        fontWeight: 'bold',
        paddingBottom: 5
    },
})