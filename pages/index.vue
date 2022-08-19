<template>
  <div class="container-fluid py-3">
    <h1>Blklight Notes</h1>
    <div class="d-flex justify-content-end">
      <button class="btn btn-raised btn-uv" @click.prevent="formSwitch">
        <font-awesome-icon :icon="['fa', 'plus']" class="me-2" />Add Note
      </button>
      <button class="btn btn-raised btn-uv" @click.prevent="darkTheme">
        <font-awesome-icon :icon="['fa', 'adjust']" />
      </button>
    </div>
    <section v-if="notes.length === 0" class="py-5">
      <h1
        class="text-center py-4 d-flex align-items-center justify-content-center"
      >
        Click on
        <button class="btn btn-raised btn-uv mx-2" @click.prevent="formSwitch">
          <font-awesome-icon :icon="['fa', 'plus']" class="me-2" />Add Note
        </button>
        to write your first note
      </h1>
    </section>

    <section v-if="notes.length > 0" class="note-grid">
      <template v-for="(item, i) in notes">
        <NoteCard :key="i" :note="item" @editNote="setEditNote" />
      </template>
    </section>

    <NoteForm
      :editMode="isEditNote"
      :noteId="noteForEdit"
      @updatedNotes="settingNotes"
    />
    <!-- <section class="container">
      <div
        class="card card-raised border border-uv my-4"
        :class="[isDarkTheme ? 'bg-dark' : '']"
      >
        <div class="card-header text-light bg-uv">
          <h3 class="my-0">
            <font-awesome-icon :icon="['fa', 'plus']" class="me-1" /> Add Note
          </h3>
        </div>
        <div class="card-body">
          <div>
            <p>
              <strong>{{ formatDate() }}</strong>
            </p>
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">
              <strong>Title</strong>
            </label>
            <input
              id="title"
              v-model="note.title"
              type="email"
              class="form-control form-control-lg form-underline-uv"
              :class="[isDarkTheme ? '' : 'form-control-light-theme']"
              placeholder="name@example.com"
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">
              <strong>Description</strong>
            </label>
            <textarea
              id="description"
              v-model="note.description"
              class="form-control form-underline-uv"
              :class="[isDarkTheme ? '' : 'form-control-light-theme']"
              rows="8"
            ></textarea>
          </div>
          <div class="d-grid">
            <button class="btn btn-uv" @click.prevent="saveNote()">
              <font-awesome-icon :icon="['fa', 'plus']" class="me-1" />Add note
            </button>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>
<script>
import { format } from "date-fns";
import { mapMutations, mapGetters } from "vuex";
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      notes: [],
      note: {
        id: uuidv4(),
        title: "",
        description: "",
        date: new Date(),
      },
      isEditNote: false,
      noteForEdit: "",
    };
  },
  computed: {
    ...mapGetters(["isDarkTheme", "isFormOpen"]),
  },
  watch: {},
  mounted() {
    this.notes = JSON.parse(localStorage.getItem("notes") || []);
  },
  updated() {
    // this.notes = JSON.parse(localStorage.getItem("notes") || []);
    // console.log(this.notes);
  },

  methods: {
    ...mapMutations({
      darkTheme: "darkTheme",
      formSwitch: "formSwitch",
    }),
    formatDate() {
      const formattedDate = format(new Date(), "dd, MMM yy");
      return formattedDate;
    },
    saveNote() {
      this.notes.push(this.note);
      // eslint-disable-next-line no-unused-vars
      localStorage.setItem("notes", [JSON.stringify(this.notes)]);
      // const stateNote = useStorage("notes", );
      console.log(JSON.parse(localStorage.getItem("notes")));
      this.note = {
        id: uuidv4(),
        title: "",
        description: "",
        date: new Date(),
      };
      this.notes = JSON.parse(localStorage.getItem("notes") || []);
    },
    settingNotes(value) {
      // console.log(value);
      this.notes = value;
    },
    setEditNote(value) {
      this.isEditNote = true;
      this.noteForEdit = value.id;
      this.formSwitch();

      // console.log(this.noteForEdit, this.isEditNote);
    },
  },
};
</script>

<style lang="scss">
.note-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 0 16px;
}
</style>
