insert into participants(created_at, email, age, gender, education, exp_stats, exp_charts, exp_cbm) 
  values(now(), $1, $2, $3, $4, $5, $6, $7) returning id