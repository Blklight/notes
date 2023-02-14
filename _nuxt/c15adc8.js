(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{380:function(t,e,o){var content=o(382);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(61).default)("68b0850a",content,!0,{sourceMap:!1})},381:function(t,e,o){"use strict";o(380)},382:function(t,e,o){var n=o(60)(!1);n.push([t.i,'.note-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));grid-gap:0 16px}.form-content{position:fixed;left:0;bottom:0;transform:translateY(100%);width:100%;height:100vh;background:rgba(12,12,12,.5)}.notched-border{position:relative;border-radius:.5rem;overflow:hidden}.notched-border:after{content:"";position:absolute;top:-25px;right:-25px;width:50px;height:50px;transform:rotate(45deg);background-color:#480bff;box-shadow:0 0 0 250px transparent}@-webkit-keyframes slide-in-bottom{0%{transform:translateY(1000px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes slide-in-bottom{0%{transform:translateY(1000px);opacity:0}to{transform:translateY(0);opacity:1}}@-webkit-keyframes slide-out-bottom{0%{transform:translateY(0);opacity:1}to{transform:translateY(1000px);opacity:0}}@keyframes slide-out-bottom{0%{transform:translateY(0);opacity:1}to{transform:translateY(1000px);opacity:0}}.slide-in-bottom{-webkit-animation:slide-in-bottom .5s cubic-bezier(.25,.46,.45,.94) both;animation:slide-in-bottom .5s cubic-bezier(.25,.46,.45,.94) both}.slide-out-bottom{-webkit-animation:slide-out-bottom .5s cubic-bezier(.55,.085,.68,.53) both;animation:slide-out-bottom .5s cubic-bezier(.55,.085,.68,.53) both}',""]),t.exports=n},395:function(t,e,o){"use strict";o.r(e);o(28),o(41),o(43),o(59),o(37),o(53);var n=o(21),r=(o(67),o(379),o(38),o(13),o(394)),c=o(56),l=o(396);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={data:function(){return{notes:[],note:{id:Object(l.a)(),title:"",description:"",date:new Date},isEditNote:!1,noteForEdit:"",isBlock:!1,updateList:!1}},computed:f(f({},Object(c.b)(["isDarkTheme","isFormOpen"])),{},{isDisabled:function(){return!this.note.title}}),watch:{displayForm:function(t){this.isBlock=t},notes:{handler:function(){localStorage.setItem("notes",JSON.stringify(this.notes))},deep:!0}},mounted:function(){this.notes=JSON.parse(localStorage.getItem("notes"))||[]},updated:function(){this.isBlockForm()},methods:f(f({},Object(c.c)({darkTheme:"darkTheme",formSwitch:"formSwitch"})),{},{isBlockForm:function(){var t=this;return setTimeout((function(){t.isBlock=t.isFormOpen}),300),this.isFormOpen},formatDate:function(){return Object(r.a)(new Date,"dd, MMM yy")},saveNote:function(){this.notes.push(this.note),this.note={id:Object(l.a)(),title:"",description:"",date:new Date},this.updateList=!0,this.formSwitch()},editNote:function(t){var e=this.notes.findIndex((function(e){return e.id===t}));this.notes[e]={id:this.note.id,title:this.note.title,description:this.note.description,date:this.note.date},this.note={id:Object(l.a)(),title:"",description:"",date:new Date},this.updateList=!0,this.formSwitch()},settingNotes:function(t){this.notes=t},setEditNote:function(t){this.isEditNote=!0,console.log(t),this.note={id:t.id,title:t.title,description:t.description,date:t.date},this.formSwitch()},setUpdateNotes:function(t){t&&(this.notes=JSON.parse(localStorage.getItem("notes"))||[])},deleteNote:function(t){this.notes=this.notes.filter((function(e){return e!==t}))}})},v=(o(381),o(80)),component=Object(v.a)(m,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"container-fluid py-3"},[e("h1",[t._v("Blklight Notes")]),t._v(" "),e("div",{staticClass:"d-flex justify-content-start mb-2"},[e("button",{staticClass:"btn btn-raised rounded btn-uv me-1",on:{click:function(e){return e.preventDefault(),t.formSwitch.apply(null,arguments)}}},[e("font-awesome-icon",{staticClass:"me-2",attrs:{icon:["fa","plus"]}}),t._v("Add Note\n    ")],1),t._v(" "),e("button",{staticClass:"btn btn-raised rounded btn-uv",on:{click:function(e){return e.preventDefault(),t.darkTheme.apply(null,arguments)}}},[e("font-awesome-icon",{attrs:{icon:["fa","adjust"]}})],1)]),t._v(" "),0===t.notes.length?e("section",{staticClass:"py-5"},[e("h1",{staticClass:"text-center py-4"},[t._v("\n      Click on\n      "),e("button",{staticClass:"btn btn-raised btn-uv mx-2",on:{click:function(e){return e.preventDefault(),t.formSwitch.apply(null,arguments)}}},[e("font-awesome-icon",{staticClass:"me-2",attrs:{icon:["fa","plus"]}}),t._v("Add Note\n      ")],1),t._v("\n      to write your first note\n    ")])]):t._e(),t._v(" "),t.notes.length>0?e("section",{staticClass:"note-grid"},[t._l(t.notes,(function(o){return[e("article",{key:o.id,staticClass:"card card-raised notched-border border border-uv hover-card-bordered-uv",class:[t.isDarkTheme?"bg-dark":""]},[e("div",{staticClass:"card-body"},[e("h4",[t._v(t._s(o.title))]),t._v(" "),e("p",{staticClass:"font-monospace"},[t._v("\n            "+t._s(o.description)+"\n          ")])]),t._v(" "),e("div",{staticClass:"card-footer bg-transparent border-top-0"},[e("div",{staticClass:"d-flex align-items-center justify-content-between"},[e("span",{staticClass:"font-monospace"},[t._v(t._s(t.formatDate(o.date)))]),t._v(" "),e("div",{},[e("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:{placement:"bottom",content:"Edit note"},expression:"{\n                  placement: 'bottom',\n                  content: 'Edit note',\n                }"}],staticClass:"badge bg-uv text-light border-0",on:{click:function(e){return e.preventDefault(),t.setEditNote(o)}}},[e("font-awesome-icon",{attrs:{icon:["fa","file-pen"]}})],1),t._v(" "),e("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:{placement:"bottom",content:"Delete note"},expression:"{\n                  placement: 'bottom',\n                  content: 'Delete note',\n                }"}],staticClass:"badge bg-uv text-light border-0",on:{click:function(e){return e.preventDefault(),t.deleteNote(o)}}},[e("font-awesome-icon",{attrs:{icon:["fa","trash-can"]}})],1)])])])])]}))],2):t._e(),t._v(" "),e("div",{staticClass:"form-content",class:[t.isBlock?"d-block":"d-none",t.isFormOpen?"slide-in-bottom":"slide-out-bottom"]},[e("section",{staticClass:"container h-100 d-flex flex-column justify-content-end"},[e("div",{staticClass:"card card-raised border border-uv my-3",class:[t.isDarkTheme?"bg-dark":""]},[e("div",{staticClass:"card-header text-light bg-uv d-flex align-items-center justify-content-between"},[t.isEditNote?e("h3",{staticClass:"my-0"},[e("font-awesome-icon",{staticClass:"me-1",attrs:{icon:["fa","file-pen"]}}),t._v("\n            Update Note\n          ")],1):e("h3",{staticClass:"my-0"},[e("font-awesome-icon",{staticClass:"me-1",attrs:{icon:["fa","plus"]}}),t._v(" Add Note\n          ")],1),t._v(" "),e("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:{placement:"left",content:"Close"},expression:"{\n              placement: 'left',\n              content: 'Close',\n            }"}],staticClass:"btn btn-link text-light py-1 px-1",on:{click:function(e){return e.preventDefault(),t.formSwitch.apply(null,arguments)}}},[e("font-awesome-icon",{attrs:{icon:["fa","xmark"],size:"2x"}})],1)]),t._v(" "),e("div",{staticClass:"card-body"},[e("div",[e("p",[e("strong",[t._v(t._s(t.formatDate()))])])]),t._v(" "),e("div",{staticClass:"mb-3"},[t._m(0),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.note.title,expression:"note.title"}],staticClass:"form-control form-control-lg form-underline-uv",class:[t.isDarkTheme?"":"form-control-light-theme"],attrs:{id:"title",type:"email",placeholder:"Write here your note title..."},domProps:{value:t.note.title},on:{input:function(e){e.target.composing||t.$set(t.note,"title",e.target.value)}}}),t._v(" "),e("span",{staticClass:"form-text"},[t._v("Required.")])]),t._v(" "),e("div",{staticClass:"mb-3"},[t._m(1),t._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.note.description,expression:"note.description"}],staticClass:"form-control form-underline-uv",class:[t.isDarkTheme?"":"form-control-light-theme"],attrs:{id:"description",rows:"6",placeholder:"Write here your note description..."},domProps:{value:t.note.description},on:{input:function(e){e.target.composing||t.$set(t.note,"description",e.target.value)}}})]),t._v(" "),e("div",{staticClass:"d-grid"},[t.isEditNote?e("button",{staticClass:"btn btn-uv",attrs:{disabled:t.isDisabled},on:{click:function(e){return e.preventDefault(),t.editNote(t.note.id)}}},[e("font-awesome-icon",{staticClass:"me-1",attrs:{icon:["fa","file-pen"]}}),t._v("Update note\n            ")],1):e("button",{staticClass:"btn btn-uv",attrs:{disabled:t.isDisabled},on:{click:function(e){return e.preventDefault(),t.saveNote()}}},[e("font-awesome-icon",{staticClass:"me-1",attrs:{icon:["fa","plus"]}}),t._v("Add\n              note\n            ")],1)])])])])])])}),[function(){var t=this._self._c;return t("label",{staticClass:"form-label",attrs:{for:"title"}},[t("strong",[this._v("Title:")])])},function(){var t=this._self._c;return t("label",{staticClass:"form-label",attrs:{for:"description"}},[t("strong",[this._v("Description:")])])}],!1,null,null,null);e.default=component.exports}}]);