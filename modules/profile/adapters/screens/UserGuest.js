import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Image, Button } from '@rneui/base'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function UserGuest() {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.mx}
                centerContent={true}>
                <Image
                    source={require('../../../../assets/presupuesto.png')}
                    resizeMode='contain'
                    style={styles.img} />
                <Text style={styles.title}>Bienvenido a Cochinito</Text>
                <Text style={styles.description}>
                    ¿Te gustaría ahorrar dinero?,
                    Nosotros te ayudamos, crea o inicia sesión en nuestra aplicación y
                    descubre la mejor manera de ahorrar tu dinero
                </Text>
                <View style={styles.viewBtnContainer}>
                    <Button
                        title='Iniciar Sesión'
                        icon={{
                            name: 'login-variant',
                            type: 'material-community',
                            size: 15,
                            color: 'white'
                        }}
                        buttonStyle={styles.btn}
                        containerStyle={styles.btnContainer}
                        onPress={() => navigation.navigate('loginStack')}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mx: {
        marginLeft: 32,
        marginRight: 32
    },
    img: {
        marginTop: 20,
        width: '100%',
        height: 150
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'monospace',
        margin: 10
    },
    description: {
        textAlign: 'center',
        marginBottom: 10
    },
    viewBtnContainer: {
        flex: 1,
        alignItems: 'center'
    },
    btn: {
        backgroundColor: 'tomato',
        color: '#fff'
    },
    btnContainer: {
        width: '70%'
    },
})