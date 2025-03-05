const API_KEY = process.env.EXPO_PUBLIC_RIOT_API;
const GAME_MODE = "CHERRY";

if (API_KEY === undefined || API_KEY.length === 0) {
  throw new Error("Not riot api key in env");
}

interface RiotAccount {
  puuid: string;
  gameName: string;
  tagLine: string;
}

interface MatchParticipant {
  puuid: string;
  championName: string;
  placement: number;
}

interface MatchInfo {
  participants: MatchParticipant[];
}

interface MatchDetails {
  info: MatchInfo;
}

/**
 * Helper function for making a fetch request, handles fetch error and json parsing error
 * @param url
 * @returns A promise with the specified type
 */
async function FetchRequest<T>(url: string) {
  return new Promise<T>((resolve, reject) => {
    fetch(url)
      .then((response) => {
        response
          .json()
          .then((json: T) => {
            resolve(json);
          })
          .catch((err) => reject("ERROR PARSING JSON " + err));
      })
      .catch((err) => reject("ERROR FETCHING " + err));
  });
}

/**
 * Main class for handling communication with the Rioat API
 */
export default class RiotService {
  /**
   * Fetch player account details
   * @param gameName Player name in game
   * @param tagLine Player tag in game
   * @param region Player region
   * @returns Account details such as puuid
   */
  public static async FetchAccountInfo(
    gameName: string,
    tagLine: string,
    region: string,
  ): Promise<RiotAccount> {
    const url = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${API_KEY}`;

    return FetchRequest<RiotAccount>(url);
  }

  public static FetchMatchHistory(
    puuid: string,
    region: string,
  ): Promise<string[]> {
    const start = 0;
    const count = 5;
    const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&api_key=${API_KEY}`;

    return FetchRequest<string[]>(url);
  }

  public static FetchMatchDetails(matchId: string, region: string) {
    const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`;

    return FetchRequest<MatchDetails>(url);
  }

  /*
  public static FetchAndDisplayMatchHistory(
    gameName: string,
    tagLine: string,
    region: string,
  ) {
    const accInfo = this.FetchAccountInfo(gameName, tagLine, region);
    const PUUID = accInfo.puuid;
    console.log("PUUID: " + PUUID);
    const matchIds = fetchMatchHistory(PUUID, region);

    matchIds.forEach(function (matchId) {
      try {
        const matchDetails = fetchMatchDetails(matchId, region);
        if (matchDetails.info.gameMode === GAME_MODE) {
          matchDetails.info.participants.forEach(function (participant) {
            if (participant.puuid === PUUID && participant.placement === 1) {
              const champName = participant.championName
                .replace(/[^a-zA-Z0-9]/g, "")
                .toLowerCase();
              championsRange.forEach(function (row, index) {
                const rowChamp = row[0]
                  .replace(/[^a-zA-Z0-9]/g, "")
                  .toLowerCase();
                if (
                  rowChamp === champName ||
                  rowChamp === champName + "willump" ||
                  rowChamp === champName + "glasc" ||
                  (rowChamp === "wukong" && champName === "monkeyking")
                ) {
                  console.log("God on " + participant.championName);
                }
              });
            }
            if (participant.puuid === PUUID) {
              const champName = participant.championName
                .replace(/[^a-zA-Z0-9]/g, "")
                .toLowerCase();
              championsRange.forEach(function (row, index) {
                const rowChamp = row[0]
                  .replace(/[^a-zA-Z0-9]/g, "")
                  .toLowerCase();
                if (
                  rowChamp === champName ||
                  rowChamp === champName + "willump" ||
                  rowChamp === champName + "glasc" ||
                  (rowChamp === "wukong" && champName === "monkeyking")
                ) {
                  console.log("Ocean on " + participant.championName);
                }
              });
            }
          });
        }
      } catch (e) {
        Logger.log(
          "Error processing match ID " + matchId + ": " + e.toString(),
        );
      }
    });
  }
    */
}
