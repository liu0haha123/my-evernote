<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="(val) => (notes = val)"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!curBook.id">请创建笔记本后</div>
      <div class="note-empty" v-show="!curNote.id">选择或创建笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期: {{ curNote.createdAtFriendly }}</span>
          <span> 更新日期: {{ curNote.updatedAtFriendly }}</span>
          <span> {{ statusText }}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span
            class="iconfont icon-fullscreen"
            @click="isShowPreview = !isShowPreview"
            :class="isShowPreview ? 'red' : ''"
          ></span>
        </div>
        <div class="note-title">
          <input
            type="text"
            placeholder="输入标题"
            v-model="curNote.title"
            @keydown="statusText = '编辑中...'"
            @input="onUpdateNote"
          />
        </div>
        <div class="editor">
          <textarea
            placeholder="输入内容, 支持 markdown 语法"
            v-model="curNote.content"
            @keydown="statusText = '编辑中...'"
            @input="onUpdateNote"
            v-show="isShowPreview"
          ></textarea>
          <div
            class="preview markdown-body"
            v-html="previewContent"
            v-show="!isShowPreview"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from "@/components/NoteSidebar"
import _ from "lodash"
import MarkdownIt from "markdown-it"
let md = new MarkdownIt()
import { mapActions, mapGetters, mapMutations } from "vuex"
// 需要加一个代表预览状态的CSS
export default {
  components: {
    NoteSidebar
  },
  data () {
    return {
      statusText: "未修改",
      isShowPreview: false
    }
  },
  computed: {
    ...mapGetters(["notes", "curNote","curBook"]),
    previewContent () {
      return md.render(this.curNote.content || '')
    }
  },
  created () {
    console.log("fuck");
    this.checkLogin({ path: "/login" })
  },
  methods: {
    ...mapMutations(["setCurNote"]),
    ...mapActions(["updateNote", "deleteNote", "checkLogin"]),
    onUpdateNote: _.debounce(function () {
      if (!this.curNote.id) return
      this.updateNote({ noteId: this.curNote.id, title: this.curNote.title, content: this.curNote.content })
        .then(data => {
          console.log(data);
          this.statusText = '已保存'
        }).catch(data => {
          console.log(data);
          this.statusText = '保存出错'
        })

    }, 300),

    onDeleteNote () {
      this.deleteNote({ noteId: this.curNote.id }).then(res => {
        this.$router.replace({ path: "/note" })
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.setCurNote({ curNoteId: to.query.noteId })
    next()
  }
}
</script>

<style lang="scss" scoped>
#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
  .note-detail {
    flex: 1;
    display: flex;
    flex-direction: column;

    .note-detail-ct {
      height: 100%;
    }

    .note-empty {
      font-size: 50px;
      color: #ccc;
      text-align: center;
      margin-top: 100px;
    }

    .note-bar {
      padding: 4px 20px;
      border-bottom: 1px solid #eee;
      &:after {
        content: '';
        display: block;
        clear: both;
      }
      span {
        font-size: 12px;
        color: #999;
        margin-right: 4px;
      }
      .iconfont {
        float: right;
        margin-left: 4px;
        font-size: 18px;
        cursor: pointer;
      }
      .iconfont.red {
        color: red;
      }
    }

    .note-title {
      input,
      span {
        display: inline-block;
        width: 100%;
        border: none;
        outline: none;
        font-size: 18px;
        padding: 10px 20px;
      }
    }

    .editor {
      height: calc(100% - 70px);
      position: relative;
    }
    textarea,
    .preview {
      position: absolute;
      width: 100%;
      height: 100%;
      padding: 20px;
    }

    textarea {
      border: none;
      resize: none;
      outline: none;
      font-size: 14px;
      font-family: 'Monaco', courier, monospace;
    }

    code {
      color: #f66;
    }
  }
}
</style>