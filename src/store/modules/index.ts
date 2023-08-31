
import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
    state: () => ({
      counter: 0,
      isMobile: false,
    }),
    actions: {
      setIsMobile(state: boolean) {
        this.isMobile = state
      },
    },
})