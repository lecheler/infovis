insert into activity(user_id, type, created_at) values($1, $2, now()) returning id