import { Link } from "expo-router";
import { Text, TouchableHighlight, StyleSheet, Pressable } from "react-native";

interface TodoItemProps {
  id: string;
  name: string;
}

export default function ChampionListItemComponent({ id, name }: TodoItemProps) {
  return (
    <Link href="/" asChild>
      <Pressable style={s.container}>
        <Text style={s.name}>{name}</Text>
      </Pressable>
    </Link>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "darkblue",
    justifyContent: "space-between",
    padding: 10,
    margin: 5,
  },
  name: {
    color: "white",
    padding: 10,
  },
  delete: {
    color: "white",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
});
