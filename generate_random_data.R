# Generate synthetic student data with noise


generateSythenticData(33)

generateSythenticData = function(id) {
  start = round(runif(1, 55, 80))
  end = round(runif(1, 85, 150))
  interval = (end - start)/10
  y = seq(start, end, interval)
  y = round(jitter(y, 10))
  plot(y)
  values = paste(as.character(y), sep="' '", collapse=", ")
  sql = paste('insert into wcpm ("student_id", "sept", "PM1", "PM2", "PM3", "oct", "PM4", "PM5", "jan", "PM7", "PM8") values (', id, ',', values,  ')')
  return(values)
}

# oops - no one should hit 150 11 (out of 15) tests in, right?

#
# paste(as.character(data), sep="' '", collapse=", ")
#
# getDBConnection = function() {
#   library(DBI)
#   library(RPostgreSQL)
#
#   pg = Sys.getenv(c("IV_PG_NAME", "IV_PG_HOST", "IV_PG_PORT", "IV_PG_USER", "IV_PG_PASSWORD"))
#   con = dbConnect(PostgreSQL(),dbname = pg['IV_PG_NAME'],
#                   host = pg['IV_PG_HOST'],
#                   port = pg['IV_PG_PORT'],
#                   user = pg['IV_PG_USER'],
#                   password = pg['IV_PG_PASSWORD'])
#   return(con)
# }
#
# # insert into wcpm (33, sept, PM1, PM2, PM3, oct, PM4, PM5, jan, PM7, PM8) values (60, 72, 77, 94, 99, 106, 112, 114, 117, 117)
#
# setwd('/Users/lucas/Desktop/FLIPGRID/infovis-master-2')
