import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Avatar } from '@rneui/base'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../../../kernel/components/Loading';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
//import { getAuth, updateProfile } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
//import {} from "firebase/firestore"
// import { doc, setDoc, getFirestore } from "firebase/firestore";
import { getAuth, updateProfile } from 'firebase/auth';
import AccountOptions from './AccountOptions';


export default function UserLogged(props) {
    const auth = getAuth();
    const { user } = props;
    // const { setReload, user } = props;
    const [show, setShow] = useState(false, "")
    const [text, setText] = useState('')

    // const removeValue = async () => {
    //     try {
    //         setShow(true)
    //         await AsyncStorage.removeItem('@session')
    //         setShow(false)
    //         setReload(true)
    //     } catch (e) {

    //     }
    // };

    const uploadImage = async (uri) => {
        setText('Subiendo imagen')
        setShow(true)
        const response = await fetch(uri) //genera un blob
        console.log('Uri response', response);
        const { _bodyBlob } = response
        const storage = getStorage()
        const storageRef = ref(storage, `avatar/${user.uid}`)
        return uploadBytes(storageRef, _bodyBlob)
    }



    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA)
        if (resultPermission.permissions.camera.status !== 'denied') {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1
            })
            if (!result.canceled) {
                uploadImage(result.assets[0].uri).then((response) => {
                    console.log('Imagen actualizada')
                    uploadPhotoProfile();
                }).catch((err) => {
                    console.log('Error - UserLogged', err)
                })
            } else {
                console.log('Imagen no seleccionada');
                setShow(false)
            }
        }
    }

    const uploadPhotoProfile = () => {
        const storage = getStorage();
        getDownloadURL(ref(storage, `avatar/${user.uid}`))
            .then((url) => {
                updateProfile(auth.currentUser, { photoURL: url })
                    .then(() => {
                        setShow(false);
                    })
                    .catch((err) => {
                        setShow(false);
                        console.log("fallo", err);
                    })
            }).catch((err) => {
                setShow(false);
                console.log("error al obtener la imagen", err);
            })
    }

    return (
        <View style={styles.container}>
            {user && (
                <View style={styles.infoContainer}>
                    {user.photoURL ? (<Avatar
                        size={"xlarge"}
                        rounded
                        source={{ uri: `${auth.currentUser.photoURL}` }}
                        containerStyle={styles.avatar}
                    >
                        <Avatar.Accessory
                            size={35}
                            onPress={changeAvatar}
                        />
                    </Avatar>) :
                        (<Avatar
                            size={"xlarge"}
                            rounded
                            title={user.email.charAt(0).toUpperCase().concat(user.email.charAt(1).toUpperCase())}
                            containerStyle={styles.avatarChar}
                        >
                            <Avatar.Accessory
                                size={22}
                                onPress={changeAvatar}
                            />
                        </Avatar>)
                    }



                    <View>
                        <Text style={styles.displayName} > {user.providerData[0].displayName ? user.providerData[0].displayName : "Anónimo"} </Text>
                        <Text > {user.providerData[0].email} </Text>

                    </View>
                </View>
            )}
            <AccountOptions/>
            <View style={styles.btnContainer}>
                <Button
                    title="cerrar sesion"
                    buttonStyle={styles.btn}
                    onPress={() => {
                        setText('Cerrando sesión')
                        setShow(true)
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
        minHeight: "100%",
        backgroundColor: "#FFF"
    },
    btn: {
        marginTop: 30,
        borderRadius: 10,
        backgroundColor: "tomato",
        paddingVertical: 10,
        width: 250
    },
    infoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 30,
    },
    avatar: {
        marginRight: 16
    },
    displayName: {
        fontWeight: 'bold',
        paddingBottom: 5
    },
    btnContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    avatarChar: {
        marginRight: 16,
        backgroundColor: "purple"
    },
})