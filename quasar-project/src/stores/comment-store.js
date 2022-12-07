import { defineStore } from 'pinia'
import { usePostStore } from './post-store'

export const useCommentStore = defineStore({
  id: 'comment',
  state: () => ({
    comments: []
  }),
  getters: {
    getPostComments: (state) => {
      const postSore = usePostStore()
      console.log("Ik ben de comments aan het ophalen")
      return state.comments.filter((post) => post.postId === postSore.post.id)
    }
  },
  actions: {
    async fetchComments() {
      this.comments = await fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
    }
  }
})
