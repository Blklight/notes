<template>
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
          <h3 v-if="editNote" class="my-0">
            <font-awesome-icon :icon="['fa', 'file-pen']" class="me-1" /> Update
            Note
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
              <strong>Title</strong>
            </label>
            <input
              id="title"
              v-model="info.title"
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
              v-model="info.description"
              class="form-control form-underline-uv"
              :class="[isDarkTheme ? '' : 'form-control-light-theme']"
              rows="6"
            ></textarea>
          </div>
          <div class="d-grid">
            <button
              v-if="editMode"
              class="btn btn-uv"
              @click.prevent="editNote(info.id)"
            >
              <font-awesome-icon
                :icon="['fa', 'file-pen']"
                class="me-1"
              />Update note
            </button>
            <button v-else class="btn btn-uv" @click.prevent="saveNote()">
              <font-awesome-icon :icon="['fa', 'plus']" class="me-1" />Add note
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { mapMutations, mapGetters } from "vuex";
import { format } from "date-fns";

export default {
  props: {
    noteId: {
      type: String,
      default: null,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      notes: [],
      info: {
        id: uuidv4(),
        title: "",
        description: "",
        date: new Date(),
      },

      isBlock: false,
    };
  },

  computed: {
    ...mapGetters(["isDarkTheme", "isFormOpen"]),
  },

  watch: {
    displayForm(isFormOpen) {
      this.isBlock = isFormOpen;
    },
  },

  mounted() {
    if (this.editMode) {
      const notes = JSON.parse(localStorage.getItem("notes"));
      const findNote = notes.find((obj) => {
        return obj.id === this.noteId;
      });
      this.info = {
        id: findNote.id,
        title: findNote.title,
        description: findNote.description,
        date: findNote.date,
      };
      // this.formSwitch();
      console.log("Edit Mode", this.noteId, findNote);
    }
  },

  // beforeUpdate() {
  //   // debugger;

  // },

  updated() {
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
    saveNote() {
      this.notes = JSON.parse(localStorage.getItem("notes") || []);
      this.notes.push(this.info);
      // eslint-disable-next-line no-unused-vars
      // if (process.client) {
      //   localStorage.setItem("notes", [JSON.stringify(this.notes)]);
      // }
      localStorage.setItem("notes", [JSON.stringify(this.notes)]);
      this.info = {
        id: uuidv4(),
        title: "",
        description: "",
        date: new Date(),
      };
      this.notes = JSON.parse(localStorage.getItem("notes") || []);
      console.log(JSON.parse(localStorage.getItem("notes")));
      this.formSwitch();
      this.$emit("updatedNotes", this.notes);
    },

    editNote(noteId) {
      const notes = JSON.parse(localStorage.getItem("notes"));
      const findIndex = notes.findIndex((obj) => obj.id === noteId);
      console.log(findIndex);
      console.log(notes[findIndex]);
      notes[findIndex] = {
        id: this.info.id,
        title: this.info.title,
        description: this.info.description,
        date: this.info.date,
      };
      localStorage.setItem("notes", [JSON.stringify(notes)]);
      this.info = {
        id: uuidv4(),
        title: "",
        description: "",
        date: new Date(),
      };
      this.notes = JSON.parse(localStorage.getItem("notes") || []);
      console.log(JSON.parse(localStorage.getItem("notes")));
      this.formSwitch();
      this.$emit("updatedNotes", this.notes);
    },
    formatDate() {
      const formattedDate = format(new Date(), "dd, MMM yy");
      return formattedDate;
    },

    clearData() {
      this.info = {
        id: uuidv4(),
        title: "",
        description: "",
        date: new Date(),
      };
    },
  },
};
</script>
<style lang="scss">
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
