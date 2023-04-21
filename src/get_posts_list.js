function get_posts_list(data) {
  const body = document.getElementById('download_posts');
  let result = '';
  let fields = data.request.responseText;
  fields = JSON.parse(fields);
  const count = fields.length;
  let num = 1;
  for (let i = 0; i < count; i++) {
    str_url = String(fields[i].title).substring(0, 50);
    result += `<tr>
                    <th scope="row">${num++}</th>
                    <td><a href="${fields[i].url}" target="_blank">${str_url}</a></td>
                    <td>${fields[i].rooms}</td>
                    <td>${fields[i].floor}</td>
                    <td>${fields[i].etajnost}</td>
                    <td>${fields[i].area}</td>
                    <td>${fields[i].price}</td>
                    <td><button class="btn btn-danger" onclick="del_posts('${fields[i]._id}')" type="button">Удалить</button><br>
                </tr>`;
  }
  const text = `<table class="table table-dark table-striped-columns">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Rooms</th>
                    <th scope="col">Floor</th>
                    <th scope="col">Etajnost</th>
                    <th scope="col">Area</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                ${result}
                </tbody>
                </table>
`;
  body.innerHTML = text;
}
