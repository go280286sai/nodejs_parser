function del_research(id) {
  axios.post('/api/del_research', { _id: id })
    .then((data) => {
      get_list(data);
    })
    .catch((err) => {
      console.log(err.messages);
    });
}
