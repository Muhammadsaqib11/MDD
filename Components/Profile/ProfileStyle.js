import { StyleSheet, Platform } from "react-native";
const styles = StyleSheet.create({
    panel: {
        height: Platform.OS === "ios" ? 730 : 600,
        padding: 20,
        backgroundColor: 'red',
    },
    ViewTwo: {
        height: 35,
        backgroundColor: "#ECECE7",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 10,
        width: '100%',
        borderWidth: 1,
        borderColor: '#cccccc',
        elevation: 5,
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2
    },
    Child_View: {
        flexDirection: "row",
        marginTop: 2
    },
    search_Icon: {
        marginLeft: 5,
        marginTop: 5
    },
    BotomSheetHeaderView: {
        width: '80%',
        height: 38,
        marginBottom: 20,
    },
    BotomSheetHeader: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black'
    },
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