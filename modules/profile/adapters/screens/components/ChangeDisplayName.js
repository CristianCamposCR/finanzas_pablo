import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { Input,Button } from '@rneui/base'

export default function ChangeDisplayName() {
  const [display, setDisplay] = useState("");
  return (
    <View>
      <ScrollView>
      <Input
          placeholder="Nombre de usuario"
          keyboardType="text"
          containerStyle={styles.input}
          autoCapitalize='none'
        />
        <Button
          title="Iniciar sesión"
          icon={
            <Icon
              type="material-community"
              name="login"
              size={22}
              color="#fff"
            />
          }
          buttonStyle={styles.btnSuccess}
          containerStyle={styles.btnContainer}
          onPress={login}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})