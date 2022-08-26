export const state = () => ({
  isDark: loadState("darkTheme") || true,
  isFormOpen: loadState("formSwitch") || undefined,
});

export const mutations = {
  darkTheme(state) {
    state.isDark = !state.isDark;
    localStorage.setItem("darkTheme", JSON.stringify(state.isDark));
  },

  formSwitch(state) {
    state.isFormOpen = !state.isFormOpen;
    localStorage.setItem("formSwitch", JSON.stringify(state.isFormOpen));
  },
};

export const getters = {
  isDarkTheme(state) {
    return state.isDark;
  },

  isFormOpen(state) {
    return state.isFormOpen;
  },
};

function loadState(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (err) {
    return false;
  }
}
