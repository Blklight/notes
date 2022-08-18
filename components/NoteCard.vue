<template>
  <article
    class="card border border-uv hover-card-bordered-uv"
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
            class="btn btn-link text-uv btn-sm px-2 me-2"
            @click.prevent="editNote(note.id)"
          >
            <font-awesome-icon :icon="['fa', 'file-pen']" />
          </button>
          <button
            v-tooltip="{
              placement: 'bottom',
              content: 'Delete note',
            }"
            class="btn btn-link text-uv btn-sm px-2"
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
      console.log(value);
    },
    formatDate(date) {
      const formattedDate = format(new Date(date), "dd, MMM yy");

      return formattedDate;
    },
  },
};
</script>
