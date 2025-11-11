export interface Character {
  id: string;
  name: string;
  profilePicture: string;
  biography: string;
}

export interface Choice {
  id: string;
  text: string;
}

export interface SceneCharacter {
  id: string;
  characterId: string;
  image: string;
  audioUrl: string;
}

export interface Scene {
  narrative: string;
  narrativeAudio: string;
  choices: Choice[];
  sceneCharacters: SceneCharacter[];
}

export interface GameData {
  characters: Character[];
  scene: Scene;
}
