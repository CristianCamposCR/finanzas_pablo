import { Modal, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react'
import { Icon } from 'react-native-elements'
import { Button } from '@rneui/base';

export default function Alert(props) {
    const { show, text, type } = props
    const [modalVisible, setModalVisible] = useState(show);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.iconContainer}>
                            {icon(type)}
                        </View>
                        <Text style={styles.info}>{text}</Text>
                        <Button
                            buttonStyle={styles.btn}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            Cerrar
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const icon = (type) => {
    let iconName
    let color
    switch (type) {
        case 'error':
            iconName = 'close-circle-outline'
            color = 'tomato'
            break;
        case 'success':
            iconName = 'check-bold'
            color = 'green'
            break
        default:
            iconName = 'help'
            color = 'grey'
            break;
    }
    return (<Icon type='material-community'
        name={iconName}
        size={85}
        color={color}></Icon>)
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5
    },
    info: {
        marginBottom: 15,
        color: 'blac',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20
    },
    btn: {
        backgroundColor: 'tomato',
        marginHorizontal: 20,
        borderRadius: 10,
        width: 150
    },
});