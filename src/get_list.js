function get_list(data) {
  const body = document.getElementById('list_research');
  let result = '';
  let fields = data.request.responseText;
  fields = JSON.parse(fields);
  const count = fields.length;
  let num = 1;
  for (let i = 0; i < count; i++) {
    str_all = String(fields[i].url);
    str_url = String(fields[i].url).substring(0, 150);
    result += `<tr>
                    <th scope="row">${num++}</th>
                    <td title="${str_all}">${str_url}</td>
                    <td><button class="btn btn-danger" onclick="del_research('${fields[i]._id}')" type="button">Удалить</button><br>
                    <button class="btn btn-success" onclick="get_apartment('${str_all}')" type="button" id="download">Загрузка</button></td>
                </tr>`;
  }
  const text = `<table class="table table-dark table-striped-columns">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
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
