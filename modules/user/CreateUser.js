import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { isEmpty, size } from 'lodash'
import { Image, Input, Button, Icon } from '@rneui/base'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { validateEmail } from '../../kernel/validations'

import Loading from '../../kernel/components/Loading'

export default function CreateUser() {
    const payLoad = {
        email: '',
        password: '',
        repeatPassword: ''
    }
    const auth = getAuth();
    const [show, setShow] = useState(false)
    const [error, setError] = useState(payLoad)
    const [data, setData] = useState(payLoad)
    const [showPassword, setShowPassword] = useState(true)
    const [showRepeatPassword, setShowRepeatPassword] = useState(true)
    const changePayLoad = (e, type) => {
        setData({ ...data, [type]: e.nativeEvent.text })
    }
    const createUser = () => {
        //console.log('CreateUser 24 -> data',data);
        if (!(isEmpty(data.email) || isEmpty(data.password))) {
            if (validateEmail(data.email)) {
                if (size(data.password) >= 6) {
                    if (data.password == data.repeatPassword) {
                        setError(payLoad)
                        console.log('Listo para el registro');
                    } else {
                        setError({ email: '', password: 'Debe coincidir con repetir contraseña', repeatPassword: 'Debe coincidir con repetir contraseña' })
                    }
                } else {
                    setError({ email: '', password: 'Se require una contraseña de por lo menos 6 caracteres', repeatPassword: 'Se require una contraseña de por lo menos 6 caracteres' })
                }
            } else {
                setError({ email: 'Debe ser un email valido', password: '', repeatPassword: '' })
            }

        } else {
            setError({ email: 'Campo obligatorio', password: 'Campo obligatorio', repeatPassword: 'Campo obligatorio' })
        }
    }
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require('../../assets/presupuesto.png')}
                resizeMode='contain'
                style={styles.logo}
            />
            <View style={styles.viewForm}>
                <View style={styles.container}>
                    <Input
                        placeholder='Correo Electrónico'
                        keyboardType='email-address'
                        rightIcon={
                            <Icon type='material-community' name='email' size={22} />
                        }
                        containerStyle={styles.input}
                        onChange={(e) => changePayLoad(e, 'email')}
                        errorMessage={error.email}
                        autoCapitalize='none'
                    />
                    <Input
                        placeholder='Contraseña'
                        containerStyle={styles.input}
                        rightIcon={
                            <Icon
                                type='material-community'
                                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                onPress={() => setShowPassword(!showPassword)}
                                size={22}
                            />
                        }
                        secureTextEntry={showPassword}
                        onChange={(e) => changePayLoad(e, 'password')}
                        errorMessage={error.password}
                    />
                    <Input
                        placeholder='Repetir contraseña'
                        containerStyle={styles.input}
                        rightIcon={
                            <Icon
                                type='material-community'
                                name={showRepeatPassword ? 'eye-off-outline' : 'eye-outline'}
                                onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                                size={22}
                            />
                        }
                        secureTextEntry={showRepeatPassword}
                        onChange={(e) => changePayLoad(e, 'repeatPassword')}
                        errorMessage={error.repeatPassword}
                    />
                    <Button
                        title='Crear cuenta'
                        containerStyle={styles.btnContainer}
                        buttonStyle={styles.btn}
                        onPress={createUser}
                    />
                </View>
            </View>
            <Loading show={show} text='Registrando' />
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: 159,
        marginTop: 20
    },
    viewForm: {
        marginHorizontal: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    input: {
        width: '100%',
        marginVertical: 10
    },
    btnContainer: {
        marginBottom: 20,
        width: '95%'
    },
    btn: {
        backgroundColor: '#28a745'
    },
})