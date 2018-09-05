INSERT INTO allHeloUsers
(   auth_id, 
    first_name,
    last_name,
    gender,
    picture
)VALUES(
    $1,
    $2,
    $3,
    $4,
    $5
)
Returning *;