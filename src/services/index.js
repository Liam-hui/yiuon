import api from '@/services/api';

export const Services = {
  get_album_list,
};

function get_album_list() {
    api.post('/login', {
      firstName: 'Finn',
      lastName: 'Williams'
    })
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
}