import request from "@/helpers/request"
import { friendlyDate } from "@/helpers/util"

const URL = {
    GET: "/notes/trash",
    REVERT: "/notes/:noteId/revert",
    DELETE: "/notes/:noteId/confirm",
}

export default {
    getAll ({ notebookId }) {
        return new Promise((resolve, reject) => {
            request(URL.GET.replace(":notebookId", notebookId)).then(res => {
                res.data = res.data.map(note => {
                    note.createdAtFriendly = friendlyDate(note.createdAt)
                    note.updatedAtFriendly = friendlyDate(note.updatedAt)
                    return note
                }).sort((note1, note2) => {
                    return note1.updatedAt < note2.updatedAt ? 1 : -1
                })
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    revertNote ({ noteId }) {
        return request(URL.REVERT.replace(":noteId", noteId), "PATCH")
    },
    deleteNote ({ noteId }) {
        return request(URL.DELETE.replace(":noteId", noteId), "DELETE")
    },
}