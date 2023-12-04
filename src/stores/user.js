import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        authUser: null,
        token: null,
    }),
    getters: {
        isLoggedIn: (state) => state.token !== null,
        getAuthUser: (state) => state.authUser,
        getAuthToken: (state) => state.token,
    },
    actions: {
        setAuthSession(data) {
            this.authUser = data.authUser
            this.token = data.token
            this.profileThumbnail = data.profileThumbnail
        },
        resetAuthSession() {
            this.authUser = null
            this.token = null
            this.profileThumbnail = null
        }
    },
    persist: true,
})