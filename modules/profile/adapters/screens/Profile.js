import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../../../kernel/components/Loading'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'

export default function Profile() {
    const [user, setUser] = useState(null)
    useEffect(() => {
        (async () => {
            try {
                const value = await AsyncStorage.getItem('@session')
                console.log("Session", value);
                if (value !== null) {
                    setUser(true)
                } else {
                    setUser(false)
                }
            } catch (e) {
                console.error("Error -> Profile", e)
            }
        })()
    }, [])
    if (user == null) return <Loading />
    return user ? <UserLogged /> : <UserGuest />
}

const styles = StyleSheet.create({})