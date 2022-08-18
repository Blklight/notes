<template>
  <main
    style="min-height: 100vh"
    :class="isDarkTheme ? 'text-light bg-dark' : ''"
  >
    <div class="main-container">
      <div class="main-flex-layout">
        <div class="main-content">
          <Nuxt />
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      data: [],
    };
  },

  computed: {
    ...mapGetters(["isDarkTheme", "isSidebarOpen"]),
  },
  methods: {
    ...mapMutations({
      darkTheme: "darkTheme",
      sidebarSwitch: "sidebarSwitch",
    }),
  },
};
</script>
<style lang="scss">
body {
  background: url("../assets/mask-overlays/13-extra.png");
  background-attachment: local;
}
</style>
