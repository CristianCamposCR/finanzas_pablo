import { StyleSheet, View } from 'react-native'
import { getAuth, signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import React from 'react'
import { Button, Icon, Input } from '@rneui/base';
import { useState } from 'react';
import Loading from '../../../../../kernel/components/Loading';
import { isEmpty } from 'lodash';

export default function ChangePassword(props) {
    const { setReload } = props
    const auth = getAuth()

    const payLoad = {
        email: '',
        password: '',
        newPassword: ''
    }
    const [show, setShow] = useState(false)
    const [text, setText] = useState('')
    const [error, setError] = useState(payLoad)
    const [data, setData] = useState(payLoad)

    const [showPassword, setShowPassword] = useState(true)
    const [showNewPassword, setShowNewPassword] = useState(true)

    const changePayLoad = (e, type) => {
        setData({ ...data, [type]: e.nativeEvent.text })
    }

    const updatePass = () => {
        setShow(true)
        setText('Actualizando...')
        if (!(isEmpty(data.email) || isEmpty(data.password) || isEmpty(data.newPassword))) {
            console.log("Listos para iniciar sesión");
            setShow(true)
            setError({ email: '', password: '', newPassword: '' })
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then(async (userCredential) => {
                    console.log(userCredential)
                    if (!isEmpty(data.newPassword)) {
                        updatePassword(auth.currentUser, data.newPassword).then(() => {
                            setError({ email: '', password: '', newPassword: '' })
                            console.log('Contraseña actualizada');
                            setShow(false)
                            setReload(true)
                        }).catch((error) => {
                            setError({ password: 'Error al actualizar contraseña' })
                            console.log('Error', error)
                            setShow(false)
                        })
                    } else {
                        setShow(false)
                        setError({ password: 'Campo obligatorio' })
                    }
                })
                .catch((error) => {
                    setError({ email: '', password: 'Usuario o contraseña incorrectos', newPassword: '' })
                    setShow(false)
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode)
                    console.log(errorMessage)
                });
        } else {
            setError({ email: 'Campo obligatorio', password: 'Campo obligatorio', newPassword: 'Campo obligatorio' })
            setShow(false)
        }
    }


    return (
        <View>
            <Input
                label='Email'
                labelStyle={styles.label}
                containerStyle={styles.input}
                onChange={(e) => changePayLoad(e, 'email')}
                errorMessage={error.email}
                autoCapitalize='none'
            />
            <Input
                label='Contraseña Actual'
                labelStyle={styles.label}
                containerStyle={styles.input}
                onChange={(e) => changePayLoad(e, 'password')}
                errorMessage={error.password}
                autoCapitalize='none'
                secureTextEntry={showPassword}
                rightIcon={
                    <Icon type="material-community"
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        color="#007bff"
                        onPress={() => setShowPassword(!showPassword)}>
                    </Icon>}
            />
            <Input
                label='Nueva Contraseña'
                labelStyle={styles.label}
                containerStyle={styles.input}
                onChange={(e) => changePayLoad(e, 'newPassword')}
                errorMessage={error.newPassword}
                autoCapitalize='none'
                secureTextEntry={showNewPassword}
                rightIcon={
                    <Icon type="material-community"
                        name={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
                        color="#007bff"
                        onPress={() => setShowNewPassword(!showNewPassword)}>
                    </Icon>}
            />
            <Button
                title="Actualizar"
                icon={
                    <Icon
                        type="material-community"
                        name="update"
                        size={22}
                        color="#fff"
                    />
                }
                buttonStyle={styles.btnSuccess}
                containerStyle={styles.btnContainer}
                onPress={updatePass}
            />
            <Loading show={show} text={text} />
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    btnSuccess: {
        color: '#FFF',
        backgroundColor: 'tomato'
    },
    btnContainer: {
        margin: 16
    },
    input: {
        width: '100%',
    },
})