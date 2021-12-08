export const BASE_API_URL = "https://mw-workers.waff.workers.dev"

export const ApiUrl = {
  login: `${BASE_API_URL}/login`,
  register: `${BASE_API_URL}/register`,
  posts: `${BASE_API_URL}/posts`,
  getUserDetail: (username) => `${BASE_API_URL}/users/${username}`,
  getPosts: (page, sort) => {
    let url = `${BASE_API_URL}/posts?`
    if (page && sort) {
      return url + `page=${page}&sort=${sort}`
    } else if (page) {
      return url + `page=${page}`
    } else if (sort) {
      return url + `sort=${sort}`
    } else {
      return url
    }
  },
  getUserPosts: (username, page, sort) => {
    let url = `${BASE_API_URL}/${username}/posts?`
    if (page && sort) {
      return url + `page=${page}&sort=${sort}`
    } else if (page) {
      return url + `page=${page}`
    } else if (sort) {
      return url + `sort=${sort}`
    } else {
      return url
    }
  },
  deleteUserPosts: `${BASE_API_URL}/posts/delete`,
  getPostDetail: (slug) => `${BASE_API_URL}/posts/${slug}`,
  votePosts:`${BASE_API_URL}/votes`
}
