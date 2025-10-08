import {StyleSheet, Text, TextInput, View} from "react-native";
import {GlobalStyles} from "../../constants/styles";

export default function ExpenseInput({inputLabelText, invalid, style, textInputConfig}) {

    let inputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline)
        inputStyles.push(styles.inputMultiline);

    if (invalid) {
        inputStyles.push(styles.invalidInput);
    }

    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{inputLabelText}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 4,
        marginVertical: 8,
    }, label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
    }, input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 10,
        borderRadius: 6,
        fontSize: 18,
    }, inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top",
    }, invalidLabel: {
        color: GlobalStyles.colors.error500,
    }, invalidInput: {
        backgroundColor: GlobalStyles.colors.error50,
    }
})