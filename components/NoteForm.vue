<template>
  <div
    class="form-content"
    :class="[
      isBlock ? 'd-block' : 'd-none',
      isFormOpen ? 'slide-in-bottom' : 'slide-out-bottom',
    ]"
  >
    <section class="container">
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
    </section>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { mapMutations, mapGetters } from "vuex";
import { format } from "date-fns";

export default {
  props: {
    note: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
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
      console.log(this.isFormOpen);
      return this.isFormOpen;
    },
    saveNote() {
      this.notes.push(this.info);
      // eslint-disable-next-line no-unused-vars
      localStorage.setItem("notes", [JSON.stringify(this.notes)]);
      // const stateNote = useStorage("notes", );
      console.log(JSON.parse(localStorage.getItem("notes")));
      this.data = {
        id: uuidv4(),
        title: "",
        description: "",
        date: new Date(),
      };
      this.notes = JSON.parse(localStorage.getItem("notes") || []);
      this.formSwitch();
    },
    formatDate() {
      const formattedDate = format(new Date(), "dd, MMM yy");
      return formattedDate;
    },
  },
};
</script>
<style lang="scss">
.form-content {
  position: fixed;
  bottom: 0;
  transform: translateY(100%);
  width: 100%;
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
