function del_posts(id) {
  axios.post('/api/del_post', { _id: id })
    .then((data) => {
      get_posts_list(data);
    })
    .catch((err) => {
      console.log(err.messages);
    });
}
