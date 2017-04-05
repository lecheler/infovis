insert into 
  answers(user_id, question_id, block_id, type, answer, score, answer_time, secondary_task_time, answer_changes, prompt, created_at) 
    values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, now()) returning id