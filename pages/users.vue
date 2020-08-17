<template>
  <div>
    <div>
      <!-- Loading  -->
      <v-progress-circular
        v-if="usernames.length == 0"
        indeterminate
        color="purple"
        size="70"
      />
      <v-menu
        v-for="u in usernames"
        v-else
        :key="u.username"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-chip
            :color="u.iscrawl ? 'blue' : 'yellow darken-4'"
            class="ma-1 pa-4"
            filter
            v-bind="attrs"
            :input-value="u.selected"
            @click="u.selected = !u.selected"
            @click.right.prevent="on.click"
          >
            {{ u.username }}
          </v-chip>
        </template>
        <v-card>
          Hello Wolrd
        </v-card>
      </v-menu>
    </div>

    <v-btn outlined block @click="loadMore">Load More</v-btn>

    <fab-buttons-vue
      :action-buttons="actionButtons"
      :disabled="(btn) => !(noOneSelected || btn.isAdd)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import urls from '../IFetch';
import { UserRow, FabButton } from '~/types.ts';
import FabButtonsVue from '~/components/fabButtons.vue';

@Component({
  components: {
    FabButtonsVue
  }
})
export default class UserPage extends Vue {

  sheetOpen = false
  currentSheet = ''

  pageStart = 0
  pageCount = 100
  usernames: UserRow[] = []

  actionButtons: FabButton[] = [
    {
      text: 'delete',
      class: 'red accent-4',
      icon: 'mdi-account-multiple-remove',
      small: true,
      onClick: () => this.showDeleteSheet()
    },
    {
      text: 'change total crawl',
      class: 'yellow black--text',
      icon: 'mdi-stop-circle-outline',
      small: true,
      onClick: () => this.showChangeCrawlSheet()
    },
    {
      text: 'crawl in a time range',
      class: 'teal',
      icon: 'mdi-timeline-plus-outline',
      small: true,
      onClick: () => this.showCrawlRangeSheet()
    },
    {
      text: 'delete tweets',
      class: 'red lighten-1',
      icon: 'mdi-chat-remove-outline',
      small: true,
      onClick: () => this.showDeleteTweetSheet()
    },
    {
      text: 'add user',
      class: 'green darken-4',
      icon: 'mdi-plus',
      isAdd: true,
      onClick: () => this.showAddSheet()
    }
  ]

  showAddSheet () {
    this.$store.commit('bottomSheet/show', {
      compName: 'UserAddSheet'
    });
  }

  showDeleteSheet () {
    this.$store.commit('bottomSheet/show', {
      compName: 'UserDeleteSheet',
      compProps: {
        selectedUsers: this.selectedUsers,
        endProcessCallback: (deletedUsernames) => {
          this.usernames = this.usernames.filter((u) => {
            if (deletedUsernames.includes(u)) {
              return false;
            } else { return true; }
          });
        }
      }
    });
  }

  showChangeCrawlSheet () {
    this.$store.commit('bottomSheet/show', {
      compName: 'UserChangeCrawlSheet',
      compProps: {
        selectedUsers: this.selectedUsers,
        successActionCallback: (changedCrawlUsers: UserRow[], crawlSwitch) => {
          this.usernames = this.usernames.map((u: UserRow) => {
            if (changedCrawlUsers.includes(u)) {
              return { ...u, iscrawl: crawlSwitch, selected: false };
            } else { return { ...u, selected: false }; }
          });
        }
      }
    });
  }

  showCrawlRangeSheet () {
    this.$store.commit('bottomSheet/show', {
      compName: 'UserCrawlRangeSheet',
      compProps: {
        selectedUsers: this.selectedUsers,
        endActionCallback: () => {
          this.usernames = this.usernames.map(u => ({ ...u, selected: false }));
        }
      }
    });
  }

  showDeleteTweetSheet () {
    this.$store.commit('bottomSheet/show', {
      compName: 'UserDeleteTweetSheet',
      compProps: {
        selectedUsers: this.selectedUsers,
        endActionCallback: () => {
          this.usernames = this.usernames.map(u => ({ ...u, selected: false }));
        }
      }
    });
  }

  get noOneSelected () {
    for (const user of this.usernames) {
      if (user.selected) { return true; }
    }
    return false;
  }

  get selectedUsers () {
    const selectedUsers = [];

    for (const user of (this as any).usernames) {
      if (user.selected) { selectedUsers.push(user); }
    }

    return selectedUsers;
  }

  async mounted () {
    const res = await fetch(urls.user.url + urls.user.get(this.pageCount, this.pageStart));

    if (res.status === 200) {
      const data: UserRow[] = (await res.json()).data;
      this.usernames = data.map(u => ({ selected: false, ...u }));
    }
  }

  async loadMore () {
    this.pageStart += this.pageCount;
    const res = await fetch(urls.user.url + urls.user.get(this.pageCount, this.pageStart));

    const data: UserRow[] = (res.status === 200) && (await res.json()).data;

    if (data) {
      this.usernames = this.usernames.concat(
        data.map(u => (
          { ...u, selected: false }
        ))
      );
    }
  }

  // closeSheet (btn: any) {
  //   btn.sheetOpen = false
  //   this.usernames.map((u) => { u.selected = false })
  // }

  endAction (action: any) {
    switch (action.type) {
      /* case UserActionTypes.deleteUser: {
        const deletedUsernames: UserRow[] = action.deletedUsernames

        this.usernames = this.usernames.filter((u) => {
          if (deletedUsernames.includes(u)) {
            return false
          } else { return true }
        })

        break
      } */

      /* case UserActionTypes.changeCrawl: {
        const { crawlSwitch, changedCrawlUsers } = action

        this.usernames.map((u: UserRow) => {
          if (changedCrawlUsers.includes(u)) {
            u.iscrawl = crawlSwitch
          }
        })

        break
      } */

      // case UserActionTypes.addUser: {
      //   const { username } = action

      //   this.usernames = [{
      //     username,
      //     iscrawl: true,
      //     selected: false
      //   }].concat(this.usernames)

      //   break
      // }

      default:
        break;
    }
  }
}
</script>

<style scoped>
.fab-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  align-items: center;

  position: absolute;
  right: 5px;
  bottom: 0;
}
</style>
