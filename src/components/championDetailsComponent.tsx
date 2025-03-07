import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
} from "react-native";

interface ChampionDetailsProps {
  mastery: number;
  imgUrl: string;
  name: string;
  played: boolean;
  god: boolean;
}

export default function ChampionDetailsComponent({
  mastery,
  imgUrl,
  name,
  played,
  god,
}: ChampionDetailsProps) {
  return (
    <View style={s.background}>
      <View style={s.left}>
        <LinearGradient colors={["#785A28", "#C8AA6E"]}>
          <View style={s.imgContainer}>
            <Image style={s.img} source={{ uri: imgUrl }}></Image>
          </View>
        </LinearGradient>
        <View style={s.textContainer}>
          <Text style={s.name}>{name}</Text>
          <Text style={s.mastery}>Mastery Level {mastery}</Text>
        </View>
      </View>
      <View style={s.right}>
        <View style={s.checkContainer}>
          <LinearGradient
            colors={played ? ["#C8AA6E", "#785A28"] : ["#463714", "#463714"]}
          >
            <LinearGradient
              colors={played ? ["#0AC8B9", "#0397AB"] : ["#0f171f", "#0f171f"]}
              style={s.check}
            />
          </LinearGradient>
          <Text style={s.checkText}>Ocean</Text>
        </View>
        <View style={s.checkContainer}>
          <LinearGradient
            colors={god ? ["#C8AA6E", "#785A28"] : ["#463714", "#463714"]}
          >
            <LinearGradient
              colors={god ? ["#0AC8B9", "#0397AB"] : ["#0f171f", "#0f171f"]}
              style={s.check}
            />
          </LinearGradient>
          <Text style={s.checkText}>God</Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  name: {
    fontFamily: "Beaufort Bold",
    color: "#ccbf91",
    fontSize: 17,
  },
  mastery: {
    fontFamily: "Spiegel SemiBold",
    color: "#A09B8C",
    fontSize: 10,
  },
  left: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10,
  },
  right: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 10,
  },
  imgContainer: {
    width: 60,
    height: 60,
    padding: 1.5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "100%",
    margin: 1.5,
  },
  border: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#010A13",
    width: "95%",
  },
  background: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#010A13",
    paddingHorizontal: 10,
    margin: 1.5, // <-- Border Width
    marginRight: 2,
  },
  checkContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: -10,
  },
  checkText: {
    color: "#A09B8C",
    marginTop: 5,
  },
  check: {
    width: 20,
    height: 20,
    margin: 1.5,
  },
});
