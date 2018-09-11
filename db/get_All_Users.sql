select * from allHeloUsers 
where id not in
(select user_id from heloFriends where friend_id = $1) 
and id != $2;
