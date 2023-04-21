function get_research() {
  axios.get('/api/get_research')
    .then((data) => {
      get_list(data);
    })
    .catch((err) => {
      console.log(err.messages);
    });
}
