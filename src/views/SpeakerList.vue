<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Speakers</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="outer-content">
      <ion-list>
        <ion-grid fixed>
          <ion-row align-items-stretch>
            <ion-col size="12" size-md="6" v-for="speaker in speakers" :key="speaker.id">
              <ion-card class="speaker-card">
                <ion-card-header>
                  <ion-item detail="false" lines="none" button @click="goToSpeakerDetail(speaker)">
                    <ion-avatar slot="start">
                      <img v-bind:src="speaker.profilePic" alt="Speaker profile pic">
                    </ion-avatar>
                    <div id="chart"></div>
                     {{speaker.name}}
                  </ion-item>

                  <ion-item
                    :detail="false"
                    button
                    @click="navigateToSpeaker(speaker.id)"
                  >
                    <ion-label>
                      <h3>About {{ speaker.name }}</h3>
                    </ion-label>
                  </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { onMounted, computed } from "vue";
import { Speaker } from "@/store/modules/speakers";
import { Session } from "@/store/modules/sessions";
import c3 from 'c3'

@Component
export default class SpeakerList extends Vue {
  ionViewDidEnter() {
    console.log("entered");
    this.init();
  }

  init () {
        console.log("YO");
    var chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25]
      ]
    }
});
  }

  get speakers() {
    return this.$store.state.speakers.speakers.concat().sort();
  }

const sessionsBySpeaker = (speakerId: number) => {
  return store.state.sessions.sessions.filter((session: Session) =>
    session.speakerIds.includes(speakerId)
  );
};

const navigateToSpeaker = (id: number) => {
  router.push(`/tabs/speakers/speaker/${id}`);
};

const navigateToSession = (id: number) => {
  router.push(`/tabs/speakers/session/${id}`);
};

onMounted(async () => {
  // Only load data if it's not already loaded
  if (store.state.speakers.speakers.length === 0) {
    await store.dispatch("loadSpeakerData");
  }
  if (store.state.sessions.sessions.length === 0) {
    await store.dispatch("loadSessionData");
  }
});
</script>

<style scoped>
.speaker-card {
  display: flex;
  flex-direction: column;
}

/* Due to the fact the cards are inside of columns the margins don't overlap
 * properly so we want to remove the extra margin between cards
 */
ion-col:not(:last-of-type) .speaker-card {
  margin-bottom: 0;
}

.speaker-card .speaker-item {
  --min-height: 85px;
}

.speaker-card .speaker-item h2 {
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.speaker-card .speaker-item p {
  font-size: 13px;
  letter-spacing: 0.02em;
}

.speaker-card ion-card-header {
  padding: 0;
}

.speaker-card ion-card-content {
  flex: 1 1 auto;
  padding: 0;
}

.ios ion-list {
  margin-bottom: 10px;
}

.md ion-list {
  padding: 0;
  border-top: 1px solid var(--ion-color-step-150, #d7d8da);
}
</style>
