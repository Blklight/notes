<template>
  <article
    class="card notched-border border border-uv hover-card-bordered-uv"
    :class="[isDarkTheme ? 'bg-dark' : '']"
  >
    <div class="card-body">
      <h4>{{ note.title }}</h4>
      <p class="font-monospace">
        {{ note.description }}
      </p>
    </div>
    <div class="card-footer bg-transparent border-top-0">
      <div class="d-flex align-items-center justify-content-between">
        <span class="font-monospace">{{ formatDate(note.date) }}</span>
        <div class="">
          <button
            v-tooltip="{
              placement: 'bottom',
              content: 'Edit note',
            }"
            class="badge bg-uv text-light border-0"
            @click.prevent="editNote(note.id)"
          >
            <font-awesome-icon :icon="['fa', 'file-pen']" />
          </button>
          <button
            v-tooltip="{
              placement: 'bottom',
              content: 'Delete note',
            }"
            class="badge bg-uv text-light border-0"
            @click.prevent="deleteNote(note.id)"
          >
            <font-awesome-icon :icon="['fa', 'trash-can']" />
          </button>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
import { format } from "date-fns";
import { mapGetters } from "vuex";

export default {
  props: {
    note: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ...mapGetters(["isDarkTheme"]),
  },

  methods: {
    editNote(noteId) {
      const notes = JSON.parse(localStorage.getItem("notes"));
      const value = notes.find((obj) => {
        return obj.id === noteId;
      });
      this.$emit("editNote", value);
    },

    deleteNote(noteId) {
      const notes = JSON.parse(localStorage.getItem("notes"));

      const test = notes
        .filter((obj) => obj.id !== noteId)
        .map((obj) => ({
          ...obj,
        }));

      console.log(test);
    },

    formatDate(date) {
      const formattedDate = format(new Date(date), "dd, MMM yy");

      return formattedDate;
    },
  },
};
</script>
<style lang="scss">
.notched-border {
  position: relative;
  border-radius: 0.25rem;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: -25px;
    right: -25px;
    width: 50px;
    height: 50px;
    transform: rotate(45deg);
    background-color: #480bff;

    box-shadow: 0 0 0 250px transparent;
  }
}
</style>
