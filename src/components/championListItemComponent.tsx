import { Link } from "expo-router";
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Pressable,
} from "react-native";

interface TodoItemProps {
  imgUrl: string;
  name: string;
  played: boolean;
  god: boolean;
}

export default function ChampionListItemComponent({
  imgUrl,
  name,
  played,
  god,
}: TodoItemProps) {
  return (
    <Link href="/" asChild>
      <TouchableHighlight style={s.container}>
        <View>
          <Image source={{ uri: imgUrl }}></Image>
          <Text style={s.name}>{name}</Text>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: played ? "green" : "red",
            }}
          >
            <Text>Played</Text>
          </View>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: god ? "green" : "red",
            }}
          >
            <Text>God</Text>
          </View>{" "}
        </View>
      </TouchableHighlight>
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
