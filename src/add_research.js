function add_research() {
  const url = document.getElementById('url').value;
  axios.post('/api/add_research', { url })
    .then((data) => {
      document.getElementById('url').value = ' ';
      get_list(data);
    })
    .catch((err) => {
      console.log(err.messages);
    });
}
