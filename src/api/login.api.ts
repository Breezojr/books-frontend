import { SetStateAction } from 'react';
import { LoginInput } from '../types';
// export const LoginApi = (
//   input: LoginInput,
//   setUser: (data: SetStateAction<any>) => void,
//   setErr: (data: SetStateAction<string>) => void,
// ) => {
//   const baseUrl = 'http://localhost:3000'

//   let data
//   let error
//   fetch(baseUrl + '/auth/login',
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(input),
//     })
//     .then((res) => {
//       console.log(res.ok)
//       console.log(res.status)
//       if (res.ok !== true) {
//         error = res.body
//         throw new Error(`Server ${error} responds with error!`);
//       }
//       data = res.json()
//       setUser(data)

//       return data;
//       // return Promise.reject(response); // 2. reject instead of throw
//     })
//     .catch((err) => setErr(err.message))

//   if (data) {
//     return data
//   }
//   return error
// };


export const LoginAPi = async (input: LoginInput) => {
  const baseUrl = 'http://localhost:3000'
 
  const response = await fetch(baseUrl + '/auth/login',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
  return await response.json();
};
