import JWTDecode from 'jwt-decode';
import Swal from 'sweetalert2';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      JWTDecode(token);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Authentication failed. Please, try again!',
      }).then((res) => {
        if (res.isConfirmed) {
          localStorage.removeItem('token');
          window.location.reload();
        }
      });
    }
  }

  return token;
};

const token = localStorage.getItem('token');

export const config = {
  headers: { Authorization: `Bearer ${token}` },
};
