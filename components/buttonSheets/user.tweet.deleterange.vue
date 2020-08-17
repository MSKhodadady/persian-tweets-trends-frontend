<template>
  <v-row class="pa-4" align="stretch">
    <v-col cols="12">
      <h1>Deleting tweets in a time range:</h1>
    </v-col>

    <v-col cols="3">
      <v-menu
        v-model="menuModel.sinceDate"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="sinceDate"
            label="Since Date"
            readonly
            v-bind="attrs"
            v-on="on"
          />
        </template>
        <v-date-picker v-model="sinceDate" @input="menuModel.sinceDate = false" />
      </v-menu>
    </v-col>
    <v-col cols="3">
      <v-menu
        ref="mt1"
        v-model="menuModel.sinceTime"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="sinceTime"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="sinceTime"
            label="Since Time"
            readonly
            v-bind="attrs"
            v-on="on"
          />
        </template>
        <v-time-picker
          v-if="menuModel.sinceTime"
          v-model="sinceTime"
          full-width
          format="24hr"
          @click:minute="$refs.mt1.save(sinceTime)"
        />
      </v-menu>
    </v-col>

    <v-col cols="3">
      <v-menu
        v-model="menuModel.untilDate"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="untilDate"
            label="Until Date"
            readonly
            v-bind="attrs"
            v-on="on"
          />
        </template>
        <v-date-picker v-model="untilDate" @input="menuModel.untilDate = false" />
      </v-menu>
    </v-col>
    <v-col cols="3">
      <v-menu
        ref="mt2"
        v-model="menuModel.untilTime"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="untilTime"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="untilTime"
            label="Until Time"
            readonly
            v-bind="attrs"
            v-on="on"
          />
        </template>
        <v-time-picker
          v-if="menuModel.untilTime"
          v-model="untilTime"
          full-width
          format="24hr"
          @click:minute="$refs.mt2.save(untilTime)"
        />
      </v-menu>
    </v-col>

    <v-col cols="1">
      <v-btn large color="red" @click="deleteTweets">
        Do it!
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { UserRow } from '../../types'
import urls from '~/IFetch'

@Component({
  props: {
    selectedUsers: {
      type: Array,
      default: () => []
    },

    endActionCallback: {
      type: Function,
      default: () => {}
    }
  }
})
export default class UserDeleteTweet extends Vue {

  sinceDate = ''
  sinceTime = ''
  untilDate = ''
  untilTime = ''
  menuModel = {
    sinceDate: false,
    sinceTime: false,
    untilDate: false,
    untilTime: false
  }

  async deleteTweets () {
    const selectedUsers: UserRow[] = [...this.$props.selectedUsers]
    const deleteSuccessUsers: string[] = []

    const since = `${this.sinceDate} ${this.sinceTime}:00`
    const until = `${this.untilDate} ${this.untilTime}:00`

    this.$store.commit('bottomSheet/hide')
    this.$store.commit('snackbar/showMessage', {
      content: `deleting tweets of ${selectedUsers.length} user, since: ${since}, until: ${until}`
    })

    for (const u of selectedUsers) {
      const res = await fetch(urls.user.url, urls.user.deleteTweets(u.username, since, until))

      const data = res.status === 200 && await res.json()
      if (data && data.username === u.username) {
        deleteSuccessUsers.push(u.username)
      }
    }

    this.$props.endActionCallback();
    this.$store.commit('snackbar/showMessage', {
      content: `tweets of (${deleteSuccessUsers.length} of ${selectedUsers.length} user) deleted successfully!`
    })
  }

}
</script>
