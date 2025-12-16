import { Module } from 'vuex';
import { Session } from './sessions';

export interface Speaker {
  id: number;
  name: string;
  profilePic: string;
  twitter: string;
  github: string;
  instagram: string;
  about: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  sessions: Session[];
}

export interface SpeakerState {
  speakers: Speaker[];
}

const speakerStore: Module<SpeakerState, {}> = {
  state: {
    speakers: []
  },
  mutations: {
    updateSpeakers(state, speakers: Speaker[]) {
      state.speakers = speakers;
    },
  },
  getters: {
    allSpeakers: (state): Speaker[] => state.speakers,

    // Get a specific speaker by ID
    getSpeakerById: (state) => (id: number): Speaker | undefined => {
      return state.speakers.find(speaker => speaker.id === id);
    },

    // Get multiple speakers by their IDs
    getSpeakersByIds: (state) => (ids: number[]): Speaker[] => {
      return state.speakers.filter(speaker => ids.includes(speaker.id));
    },

    // Get speakers sorted by name
    getSpeakersSortedByName: (state): Speaker[] => {
      return [...state.speakers].sort((a, b) => a.name.localeCompare(b.name));
    }
  },
  actions: {
    async loadSpeakerData({ commit }) {

      const response = await fetch('https://runwith.ai/api/public')
      const data = await response.json();
      console.log(this.platform);
      commit('updateSpeakers', data);
    }
  }
};

export default speakerStore;
