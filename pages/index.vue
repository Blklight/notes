<template>
  <div class="container-fluid py-3">
    <h1>Blklight Notes</h1>
    <div class="d-flex justify-content-start mb-2">
      <button class="btn btn-raised btn-uv me-1" @click.prevent="formSwitch">
        <font-awesome-icon :icon="['fa', 'plus']" class="me-2" />Add Note
      </button>
      <button class="btn btn-raised btn-uv" @click.prevent="darkTheme">
        <font-awesome-icon :icon="['fa', 'adjust']" />
      </button>
    </div>

    <template v-if="updateList">
      <h1 class="text-center">Loading notes...</h1>
    </template>
    <template v-else>
      <section v-if="notes.length === 0" class="py-5">
        <h1 class="text-center py-4">
          Click on
          <button
            class="btn btn-raised btn-uv mx-2"
            @click.prevent="formSwitch"
          >
            <font-awesome-icon :icon="['fa', 'plus']" class="me-2" />Add Note
          </button>
          to write your first note
        </h1>
      </section>
      <section v-if="notes.length > 0" class="note-grid">
        <template v-for="(item, i) in notes">
          <NoteCard
            :key="i"
            :note="item"
            @editNote="setEditNote"
            @deleteNote="setUpdateNotes"
          />
        </template>
      </section>
    </template>

    <div
      class="form-content"
      :class="[
        isBlock ? 'd-block' : 'd-none',
        isFormOpen ? 'slide-in-bottom' : 'slide-out-bottom',
      ]"
    >
      <section class="container h-100 d-flex flex-column justify-content-end">
        <div
          class="card card-raised border border-uv my-3"
          :class="[isDarkTheme ? 'bg-dark' : '']"
        >
          <div
            class="card-header text-light bg-uv d-flex align-items-center justify-content-between"
          >
            <h3 v-if="isEditNote" class="my-0">
              <font-awesome-icon :icon="['fa', 'file-pen']" class="me-1" />
              Update Note
            </h3>
            <h3 v-else class="my-0">
              <font-awesome-icon :icon="['fa', 'plus']" class="me-1" /> Add Note
            </h3>
            <button
              v-tooltip="{
                placement: 'left',
                content: 'Close',
              }"
              class="btn btn-link text-light py-1 px-1"
              @click.prevent="formSwitch"
            >
              <font-awesome-icon :icon="['fa', 'xmark']" size="2x" />
            </button>
            <!-- <font-awesome-icon :icon="['fa', 'xmark']" class="me-1" /> -->
          </div>
          <div class="card-body">
            <div>
              <p>
                <strong>{{ formatDate() }}</strong>
              </p>
            </div>
            <div class="mb-3">
              <label for="title" class="form-label">
                <strong>Title:</strong>
              </label>
              <input
                id="title"
                v-model="note.title"
                type="email"
                class="form-control form-control-lg form-underline-uv"
                :class="[isDarkTheme ? '' : 'form-control-light-theme']"
                placeholder="Write here your note title..."
              />
              <span class="form-text">Required.</span>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">
                <strong>Description:</strong>
              </label>
              <textarea
                id="description"
                v-model="note.description"
                class="form-control form-underline-uv"
                :class="[isDarkTheme ? '' : 'form-control-light-theme']"
                rows="6"
                placeholder="Write here your note description..."
              ></textarea>
            </div>
            <div class="d-grid">
              <button
                v-if="isEditNote"
                class="btn btn-uv"
                :disabled="isDisabled"
                @click.prevent="editNote(note.id)"
              >
                <font-awesome-icon
                  :icon="['fa', 'file-pen']"
                  class="me-1"
                />Update note
              </button>
              <button
                v-else
                class="btn btn-uv"
                :disabled="isDisabled"
                @click.prevent="saveNote()"
              >
                <font-awesome-icon :icon="['fa', 'plus']" class="me-1" />Add
                note
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
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
      isBlock: false,
      updateList: false,
    };
  },

  computed: {
    ...mapGetters(["isDarkTheme", "isFormOpen"]),
    isDisabled() {
      const disable = !this.note.title;
      return disable;
    },
  },

  watch: {
    displayForm(isFormOpen) {
      this.isBlock = isFormOpen;
    },
  },

  mounted() {
    this.notes = JSON.parse(localStorage.getItem("notes")) || [];
  },

  updated() {
    this.updateNotes(this.updateList);
    this.isBlockForm();
  },

  methods: {
    ...mapMutations({
      darkTheme: "darkTheme",
      formSwitch: "formSwitch",
    }),

    isBlockForm() {
      setTimeout(() => {
        this.isBlock = this.isFormOpen;
      }, 300);
      return this.isFormOpen;
    },

    formatDate() {
      const formattedDate = format(new Date(), "dd, MMM yy");
      return formattedDate;
    },

    saveNote() {
      this.notes = JSON.parse(localStorage.getItem("notes")) || [];
      this.notes.push(this.note);

      if (process.client) {
        localStorage.setItem("notes", JSON.stringify(this.notes));
      }

      this.note = {
        id: uuidv4(),
        title: "",
        description: "",
        date: new Date(),
      };
      this.updateList = true;
      this.formSwitch();
    },

    editNote(noteId) {
      const notes = JSON.parse(localStorage.getItem("notes"));
      const findIndex = notes.findIndex((obj) => obj.id === noteId);
      console.log(this.note);
      debugger;
      notes[findIndex] = {
        id: this.note.id,
        title: this.note.title,
        description: this.note.description,
        date: this.note.date,
      };
      debugger;
      if (process.client) {
        localStorage.setItem("notes", JSON.stringify(notes));
      }

      this.note = {
        id: uuidv4(),
        title: "",
        description: "",
        date: new Date(),
      };

      this.updateList = true;
      this.formSwitch();
    },

    settingNotes(value) {
      this.notes = value;
    },

    setEditNote(value) {
      this.isEditNote = true;
      console.log(value);
      this.note = {
        id: value.id,
        title: value.title,
        description: value.description,
        date: value.date,
      };
      this.formSwitch();
    },

    setUpdateNotes(value) {
      if (value) {
        this.updateList = true;
      }
    },

    updateNotes(value) {
      if (value) {
        this.notes = JSON.parse(localStorage.getItem("notes"));
        this.updateList = false;
      }
    },
  },
};
</script>

<style lang="scss">
.note-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 0 16px;
}

.form-content {
  position: fixed;
  left: 0;
  bottom: 0;
  transform: translateY(100%);
  width: 100%;
  height: 100vh;
  background: rgba(12, 12, 12, 0.5);
}

@-webkit-keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

@-webkit-keyframes slide-out-bottom {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }
}
@keyframes slide-out-bottom {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }
}

.slide-in-bottom {
  -webkit-animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.slide-out-bottom {
  -webkit-animation: slide-out-bottom 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)
    both;
  animation: slide-out-bottom 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}
</style>
