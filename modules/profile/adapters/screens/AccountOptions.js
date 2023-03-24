import { StyleSheet, View } from 'react-native'
import { map } from 'lodash'
import React, { useState } from 'react'
import Modal from '../../../../kernel/components/Modal'
import ChangeAddress from './components/ChangeAddress'
import ChangePassword from './components/ChangePassword'
import ChangeDisplayName from './components/ChangeDisplayName'
import { ListItem, Icon } from '@rneui/base'

export default function AccountOptions(props) {
    const { userInfo } = props
    const { setReload } = props
    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)

    const selectComponent = (key) => {
        switch (key) {
            case 'displayName':
                setRenderComponent(<ChangeDisplayName setReload={setReload}/>)
                setShowModal(true)
                break;
            case 'password':
                setRenderComponent(<ChangePassword setReload={setReload}/>)
                setShowModal(true)
                break;
            case 'address':
                setRenderComponent(<ChangeAddress setShowModal={setShowModal} />)
                setShowModal(true)
                break;
            default:
                setRenderComponent(null)
                setShow(false)
                break;
        }
    }

    const menuOption = generateOptions(selectComponent)

    return (
        <View>
            {map(menuOption, (option, index) => (
                <ListItem containerStyle={styles.menuOption} key={index} onPress={option.onPress}>
                    <Icon
                        name={option.iconNameLeft}
                        type={option.iconType}
                        color={option.iconColorLeft}
                    />
                    <ListItem.Content>
                        <ListItem.Title>{option.title}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            ))}
            {renderComponent && (
                <Modal show={showModal} setShow={setShowModal}>
                    {renderComponent}
                </Modal>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    menuOption: {
        borderBottomWidth: 1,
        borderBottomColor: '#E3E3E3'
    },
})

const generateOptions = (selectComponent) => {
    return [
        {
            title: 'Actualizar nombre completo',
            iconType: 'material-community',
            iconNameLeft: 'account-circle',
            iconColorLeft: 'tomato',
            onPress: () => selectComponent('displayName')
        },
        {
            title: 'Actualizar contraseña',
            iconType: 'material-community',
            iconNameLeft: 'lock-reset',
            iconColorLeft: 'tomato',
            onPress: () => selectComponent('password')
        },
        {
            title: 'Actualizar ubicación',
            iconType: 'material-community',
            iconNameLeft: 'map-marker',
            iconColorLeft: 'tomato',
            onPress: () => selectComponent('address')
        },
    ]
}