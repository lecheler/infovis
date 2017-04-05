insert into 
  feedback(user_id, block_id, mental, temporal, performance, effort, frustration, feedback_time, created_at) 
    values($1, $2, $3, $4, $5, $6, $7, $8, now()) returning id