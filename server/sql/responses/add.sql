insert into 
  responses(participant_id, question_id, answer, question_time, difficulty, confidence, experience, feedback_time, 
    changes, backtracks, created_at) 
  values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, now()) returning id