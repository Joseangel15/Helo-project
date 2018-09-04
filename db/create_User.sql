INSERT INTO heloUsers
(auth_id, user_name, user_pic, given_name, family_name, gender)
VALUES
($1, $2, $3, $4, $5, $6)
RETURNING *;



