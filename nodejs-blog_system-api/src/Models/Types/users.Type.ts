/*  
  [USER TYPE ]

  *** id          => User Id                      (SERIAL PRIMARY KEY)   
  *** user_name   => User username                (VARCHAR 255)
  *** first_name  => User First Name              (VARCHAR 255)
  *** last_name   => User Last Name               (VARCHAR 255)
  *** email       => User Email adress            (VARCHAR 255)
  *** password    => User Password                (VARCHAR 60)
  *** image       => User Image                   (VARCHAR 255)
*/

type User = {
  id?: number;
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  image?: string;
};

export default User;
