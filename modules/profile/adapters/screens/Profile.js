import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../../../kernel/components/Loading'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'
import { useNavigation } from '@react-navigation/native'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
export default function Profile() {
    const navigation = useNavigation();
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (credential) => {
            setUser(credential);
            !credential ? setSession(false) : setSession(true)
        });
    }, []) //dependiendo si es true o false va a checar su hay sesion
    if (session === null) return <Loading show={true} text="Cargando" />
    return session ? <UserLogged  user={user} /> : <UserGuest navigation={navigation}/>
}

const styles = StyleSheet.create({})