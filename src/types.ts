export interface Character {
  id: string;
  name: string;
  profilePicture: string;
  biography: string;
  imageObjectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  imageObjectPosition?: string;
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

export interface SceneImage {
  id: string;
  imageUrl: string;
}

export interface Scene {
  narrative: string;
  narrativeAudio: string;
  sceneImages: SceneImage[];
  choices: Choice[];
  sceneCharacters: SceneCharacter[];
}

export interface GameData {
  characters: Character[];
  scene: Scene;
}
