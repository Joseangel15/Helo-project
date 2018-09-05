Update allHeloUsers
set 
    first_name = $1,
    last_name = $2,
    gender = $3,
    hair_color = $4,
    eye_color = $5,
    hobby = $6,
    birthday_day = $7,
    birthday_month = $8,
    birthday_year = $9   

where id = $10;