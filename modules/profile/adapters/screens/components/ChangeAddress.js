import { StyleSheet, Text, View, Dimensions, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Button, Divider } from "@rneui/base";
const widthScreen = Dimensions.get("window").width;
export default function ChangeAddress(props) {
    const { setShowModal } = props;
    const [location, setLocation] = useState(null);
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "denied") {
                try {
                    const loc = await Location.getCurrentPositionAsync({});
                    setLocation({
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude,
                        latitudDelta: 0.004757,
                        longitudDelta: 0.006866,
                    });
                } catch (error) {
                    console.log("error", error);
                }
            } else {
                //alert
            }
        })();
    }, []);
    const save = () => console.log("hola mundo", location);
    return (
        <View>
            {location && (
                <MapView
                    style={styles.map}
                    initialRegion={location}
                    showsUserLocation={true}
                    minZoomLevel={15}
                    onRegionChange={(region) => setLocation(region)}
                >
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title="mi ubicación"
                        draggable
                    />
                </MapView>
            )}
            <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
                <Divider color="tomato" width={2} style={styles.divider} />
            </View>
            <View style={styles.containerButtons}>
                <Button
                    title="Cancelar ubicación"
                    containerStyle={styles.btnDangerContainer}
                    buttonStyle={styles.btnDanger}
                    onPress={() => setShowModal(false)}
                />
                <Button
                    title="Guardar"
                    containerStyle={styles.btnSuccessContainer}
                    buttonStyle={styles.btnSuccess}
                    onPress={save}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: 560,
    },
    divider: {
        width: "100%",
    },
    containerButtons: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    btnSuccessContainer: {
        width: "50%",
        padding: 10
    },
    btnDangerContainer: {
        padding: 10
    },
    btnDanger: {
        backgroundColor: "#a60a0d",
    },
    btnSuccess: {
        backgroundColor: "#00a680",
    },
});