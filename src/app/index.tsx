import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import ChampionListComponent from "../components/championListComponent";

export default function Index() {
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
        style={{ flex: 1 }}
      >
        <LinearGradient colors={["#091428", "#0A1428"]} style={s.background} />
        <ChampionListComponent />
      </KeyboardAvoidingView>
    </>
  );
}

const s = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
