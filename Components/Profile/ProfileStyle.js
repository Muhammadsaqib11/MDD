import { StyleSheet, Platform } from "react-native";
const styles = StyleSheet.create({
    Buttonchangeorg: {
        marginTop: 30,
        marginHorizontal: 15,
        borderRadius: 5,
        borderColor: 'black',
        backgroundColor: '#d3dceb',

    },
    ButtonChangePas: {
        marginTop: 20,
        marginHorizontal: 15,
        borderRadius: 5,
        borderColor: 'black',
        backgroundColor: '#d3dceb',
    },
    LogoutButton: {
        marginTop: 20,
        marginHorizontal: 15,
        borderRadius: 5,
        borderColor: 'black',
        backgroundColor: '#d3dceb',
    },
    Header_TITLE: {
        fontSize: 20,
        width: 270,
        textAlign: 'left',
        color: Platform.OS === "android" ? "black" : null
    }

})
export default styles;