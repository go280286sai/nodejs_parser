function get_posts() {
  axios.get('/api/get_posts')
    .then((data) => {
      get_posts_list(data);
    })
    .catch((err) => {
      console.log(err.messages);
    });
}
