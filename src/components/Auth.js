export const BASE_URL = 'https://auth.nomoreparties.co/';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then((res) => {
    // try {
    //   if (res.status === 200){
    //     console.log(res);
    //     return res.json();
    //   }
    // } catch(error){
    //   return (error);
    // }
    return res.json();
  })
  .then((res) => {
    return res;
  })
  .catch((error) => console.log(error));
};