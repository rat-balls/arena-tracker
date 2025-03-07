import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
let customFonts = {
  League: require("../../assets/fonts/League.otf"),
};

const markdownContent = `
# Arena Tracker

Arena Tracker is an application that allows League of Legends players to track the champions with whom they have won a game in the Arena game mode. This tracking is done using [Riot Games](https://developer.riotgames.com/docs/lol) API.

## Built with


### Expo


## Team

- Ethan DELALANDE
- Jathurshan SIVANANTHAN
- Noé HEY-LE MADEC

## Features

- Track your progress for the Arena God and Ocean achievement in league of legends !
- Add your accounts in favorite to start tracking them ! (and import pictures to modify their profile picture)
`;

export default function Readme() {
  useFonts(customFonts);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enabled
          style={{ flex: 1 }}
        >
          <ScrollView style={styles.container}>
            <Text style={styles.title}>About</Text>
            <Markdown
              style={{
                text: { color: "#A09B8C" },
              }}
            >
              {markdownContent}
            </Markdown>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#091428",
    paddingVertical: 20,
  },
  text: {
    color: "#A09B8C",
  },
  title: {
    fontSize: 28,
    fontFamily: "League",
    color: "white",
    marginVertical: 15,
    marginTop: 20,
    marginHorizontal: "auto",
  },
});
