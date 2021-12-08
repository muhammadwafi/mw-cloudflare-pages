import axios from 'axios';
import { ApiUrl } from '../constants/constants';
import { getBase64 } from '../utils/utils';

class BaseApiCall {

  constructor() {
    this.api = axios.create({
      headers: {
        "Content-Type": "application/json",
      }
    })
  }

  login(data) {
    return this.api.post(ApiUrl.login, data)
  }

  register(data) {
    delete data.confirmPassword
    return this.api.post(ApiUrl.register, data)
  }

  User = {
    getUserDetail: (username) => {
      return this.api.get(ApiUrl.getUserDetail(username))
    }
  }

  Posts = {
    getPosts: (page, sort) => {
      return this.api.get(ApiUrl.getPosts(page, sort))
    },
    getSinglePost: (slug) => {
      return this.api.get(ApiUrl.getPostDetail(slug))
    },
    getUserPosts: (user, page, sort) => {
      return this.api.get(ApiUrl.getUserPosts(user, page, sort))
    },
    create: async (data) => {
      let image = null
      if (data.image) {
        const base64Image = await getBase64(data.image) 
        image = {
          filename: data.image.name,
          base64: base64Image
        }
        delete data.image
      }
      data = { ...data, image: image }
      return this.api.post(ApiUrl.posts, data)
    },
    delete: async (data) => {
      return this.api.post(ApiUrl.deleteUserPosts, data)
    },
    vote: async (data) => {
      return this.api.post(ApiUrl.votePosts, data)
    }
  }

}

const ApiCall = new BaseApiCall()

export default ApiCall
