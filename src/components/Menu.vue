<template>
<ion-menu contentId="menu-content">
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Menu</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>

    <ion-list>
      <ion-list-header>
        Navigate
      </ion-list-header>
      <ion-menu-toggle auto-hide="false" v-for="p in appPages" :key="p.title">
        <ion-item button @click="navigate(p.url)">
          <ion-icon slot="start" :name="p.icon"></ion-icon>
          <ion-label>
            {{p.title}}
          </ion-label>
        </ion-item>

      </ion-menu-toggle>
    </ion-list>
    <ion-list v-if="loggedIn">
      <ion-list-header>
        Account
      </ion-list-header>

      <ion-menu-toggle auto-hide="false">
        <ion-item button @click="navigate('/account')">
          <ion-icon slot="start" name="person"></ion-icon>
          <ion-label>
            Account
          </ion-label>
        </ion-item>
      </ion-menu-toggle>

      <ion-menu-toggle auto-hide="false">
        <ion-item button @click="navigate('/support')">
          <ion-icon slot="start" name="help"></ion-icon>
          <ion-label>
            Support
          </ion-label>
        </ion-item>
      </ion-menu-toggle>

      <ion-menu-toggle auto-hide="false">
        <ion-item button @click="logout()">
          <ion-icon slot="start" name="log-out"></ion-icon>
          <ion-label>
            Logout
          </ion-label>
        </ion-item>
      </ion-menu-toggle>

    </ion-list>

    <ion-list v-if="!loggedIn">
      <ion-list-header>
        Account
      </ion-list-header>

      <ion-menu-toggle auto-hide="false">
        <ion-item button @click="login()">
          <ion-icon slot="start" name="log-in"></ion-icon>
          <ion-label>
            Login
          </ion-label>
        </ion-item>
      </ion-menu-toggle>

      <ion-menu-toggle auto-hide="false">
        <ion-item button @click="foo()">
          <ion-icon slot="start" name="help"></ion-icon>
          <ion-label>
            Support
          </ion-label>
        </ion-item>
      </ion-menu-toggle>

      <ion-menu-toggle auto-hide="false">
        <ion-item button @click="navigate('/signup')">
          <ion-icon slot="start" name="person-add"></ion-icon>
          <ion-label>
            Signup
          </ion-label>
        </ion-item>
      </ion-menu-toggle>
    </ion-list>

    <ion-list>
      <ion-list-header>
        Tutorial
      </ion-list-header>
      <ion-menu-toggle auto-hide="false">
        <ion-item button @click="openTutorial()">
          <ion-icon slot="start" name="hammer"></ion-icon>
          <ion-label>Show Tutorial</ion-label>
        </ion-item>
      </ion-menu-toggle>
    </ion-list>
  </ion-content>
</ion-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import useFirebaseAuth from "../hooks/firebase-auth";
  @Component({
  computed: {
       loggedIn: function() {
         return this.$store.state.user.isAuthenticated;
       }
     }

  })

  export default class Menu extends Vue  {

    appPages: [
      {
        title: 'Schedule',
        url: '/tabs/schedule',
        name: 'tabs.schedule',
        icon: 'calendar'
      },
      {
        title: 'Speakers',
        url: '/tabs/speakers',
        icon: 'contacts'
      },
      {
        title: 'Map',
        url: '/tabs/map',
        icon: 'map'
      },
      {
        title: 'About',
        url: '/tabs/about',
        icon: 'information-circle'
      }
    ];

    navigate(url){
      this.$router.push(url)
    }

    const isDarkMode = computed(() => store.getters.isDarkMode);

    const setLocalDarkMode = (newDarkValue: boolean) => {
      localDark.value = newDarkValue;
      updateDarkMode(newDarkValue);
    }

  login() {
    const { loginz } = useFirebaseAuth();
    console.log("dudez");
  }

  }
});
</script>

<style scoped>
ion-menu ion-content {
  --padding-top: 20px;
  --padding-bottom: 20px;
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

/* Remove background transitions for switching themes */
ion-menu ion-item {
  --transition: none;
}

ion-item.selected {
  --color: var(--ion-color-primary);
}

/*
 * Material Design Menu
*/
ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-list-header {
  padding-left: 18px;
  padding-right: 18px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: min(0.875rem, 32px);
  font-weight: 450;
}

ion-menu.md ion-item {
  --padding-start: 18px;
  margin-right: 10px;
  border-radius: 0 50px 50px 0;
  font-weight: 500;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-list-header,
ion-menu.md ion-item ion-icon {
  color: var(--ion-color-step-650, #5f6368);
}

ion-menu.md ion-list:not(:last-of-type) {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

/*
 * iOS Menu
*/
ion-menu.ios ion-list-header {
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 8px;
  font-size: clamp(22px, 1.375rem, 40px);
}

ion-menu.ios ion-list {
  padding: 20px 0 0;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}
</style>
