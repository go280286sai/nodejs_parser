function get_apartment(url) {
  const set_dis = document.querySelectorAll('#download');
  for (const item of set_dis) {
    item.setAttribute('disabled', 'disabled');
  }
  const apartment_array = [];
  const Apartment = new OlxApartment(url);
  setTimeout(() => {
    const count = Apartment.title.length;
    for (let i = 0; i < count; i++) {
      apartment_array.push(
        {
          title: Apartment.title[i],
          url: Apartment.url[i],
          rooms: Apartment.rooms[i],
          floor: Apartment.floor[i],
          etajnost: Apartment.etajnost[i],
          area: Apartment.area[i],
          price: Apartment.price[i],
          location: Apartment.location[i],
          time: Apartment.time[i],
          description: Apartment.description[i],
          type: Apartment.type[i],
        },
      );
    }
    axios.post('/api/add_posts', apartment_array).then(() => {
      alert('Данные успешно загружены');
      for (const item of set_dis) {
        item.removeAttribute('disabled');
      }
    }).catch((err) => {
      alert(`Возникла ошибка: ${err.message}`);
    });
  }, 40000);
}
