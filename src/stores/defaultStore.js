import { defineStore } from "pinia";

export const useDefaultStore = defineStore('default', () => {
    const noAcceleration = {
        holdDelay: 300,
        acceleration: 1,
        initialInterval: 100
    }

    return { noAcceleration };
})