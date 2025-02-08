/*  
  [Post TYPE ]

  *** id            => Post Id                 (SERIAL PRIMARY KEY)   
  *** text          => Post Title              (VARCHAR 255)
  *** Post          => Post Body               (VARCHAR 1000)
  *** public        => Post Security           (BOOLEAN)
  *** created_date  => Post created Date       (DATE)
  *** user_id       => Post Created user       (FORIGEN KEY)
*/
type Post = {
  id?: number;
  text: string;
  Post: string;
  public: boolean;
  created_date?: string;
  user_id?: number;
};

export default Post;
