with 
  a1_grades as (select student_id, score/assignments.total*100 as a1_score from grades 
    left join assignments on assignments.id = grades.assignment_id where grades.assignment_id = 1),
  a2_grades as (select student_id, score/assignments.total*100 as a2_score from grades 
    left join assignments on assignments.id = grades.assignment_id where grades.assignment_id = 2),
  a3_grades as (select student_id, score/assignments.total*100 as a3_score from grades 
    left join assignments on assignments.id = grades.assignment_id where grades.assignment_id = 3),
  a4_grades as (select student_id, score/assignments.total*100 as a4_score from grades 
    left join assignments on assignments.id = grades.assignment_id where grades.assignment_id = 4),
  a5_grades as (select student_id, score/assignments.total*100 as a5_score from grades 
    left join assignments on assignments.id = grades.assignment_id where grades.assignment_id = 5),
  a6_grades as (select student_id, score/assignments.total*100 as a6_score from grades 
    left join assignments on assignments.id = grades.assignment_id where grades.assignment_id = 6),
  a7_grades as (select student_id, score/assignments.total*100 as a7_score from grades 
    left join assignments on assignments.id = grades.assignment_id where grades.assignment_id = 7),
  a8_grades as (select student_id, score/assignments.total*100 as a8_score from grades 
    left join assignments on assignments.id = grades.assignment_id where grades.assignment_id = 8),
  current_grade as (select student_id, sum(score)/65*100 as current_score from grades 
    left join assignments on assignments.id = grades.assignment_id group by student_id) 
select students.id, first_name, last_name, 
  coalesce(round(current_score, 2), 0) as current_score,
  coalesce(round(a1_score, 2), 0) as a1_score,
  coalesce(round(a2_score, 2), 0) as a2_score,
  coalesce(round(a3_score, 2), 0) as a3_score,
  coalesce(round(a4_score, 2), 0) as a4_score,
  coalesce(round(a5_score, 2), 0) as a5_score,
  coalesce(round(a6_score, 2), 0) as a6_score,
  '---' as a7_score,
  '---' as a8_score
from students
  left join current_grade on current_grade.student_id = students.id
  left join a1_grades on a1_grades.student_id = students.id  
  left join a2_grades on a2_grades.student_id = students.id
  left join a3_grades on a3_grades.student_id = students.id
  left join a4_grades on a4_grades.student_id = students.id
  left join a5_grades on a5_grades.student_id = students.id
  left join a6_grades on a6_grades.student_id = students.id
  left join a7_grades on a7_grades.student_id = students.id
  left join a8_grades on a8_grades.student_id = students.id
;