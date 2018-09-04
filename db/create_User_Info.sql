INSERT INTO allHeloUsers
(   auth_id, 
    first_name,
    last_name,
    gender
)VALUES(
    $1,
    $2,
    $3,
    $4
)
Returning *;