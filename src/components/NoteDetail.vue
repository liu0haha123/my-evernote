<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val=>notes = val"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="false"></div>
      <div class="note-detail-ct" v-show="true">
        <div class="note-bar">
          <span> 创建日期: {{ curNote.createdAtFriendly }}</span>
          <span> 更新日期: {{ curNote.updatedAtFriendly }}</span>
          <span> {{ curNote.statusText }}</span>
          <span class="iconfont icon-delete"></span>
          <span class="iconfont icon-fullscreen"></span>
        </div>
        <div class="note-title">
          <input type="text" placeholder="输入标题" :value="curNote.title" />
        </div>
        <div class="editor">
          <textarea
            placeholder="输入内容, 支持 markdown 语法"
            :value="curNote.content"
            v-show="true"
          ></textarea>
          <div
            class="preview markdown-body"
            v-html=""
            v-show="false"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth"
import NoteSidebar from "@/components/NoteSidebar"
export default {
  name: "NoteDetail",
  components: {
    NoteSidebar
  },
  data () {
    return {
      curNote: {
        title: "123",
        content: "456",
        createdAtFriendly: "刚刚",
        updatedAtFriendly: "刚刚",
        statusText: "未保存"
      },
      notes:{}
    }
  },
  created () {
    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" })
      }
    })
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