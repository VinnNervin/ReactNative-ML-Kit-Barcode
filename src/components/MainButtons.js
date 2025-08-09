import React from "react"
import { View } from "react-native"
import PressButton from "./buttons/pressButton"
import styles from "../style/global.style"

const MainButtons = ({ setModal }) => {
  return (
    <View style={styles.actionContainer}>
      <PressButton
        title="scan barcode"
        bgColor="#6a61f0ff"
        bgPressedColor="#5c53d4ff"
        icon="qr-code-scanner"
        onPress={() => { }}
      />

      <PressButton
        title="tambah data"
        icon="add-circle-outline"
        bgColor="#00b894"
        bgPressedColor="#00a478"
        onPress={setModal}
      />
    </View>
  )
}

export default MainButtons;