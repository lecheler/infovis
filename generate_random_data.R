# Generate synthetic student data with noise
file = "/Users/lucas/Desktop/FLIPGRID/infovis-master-2/test.json"
write("", file)

names = c('Elene', 'Reagan', 'Zackary', 'Justa', 'Corinne', 'Tegan', 'Damaris', 'Shayla', 'Sang', 'Anette', 'Leota', 'Joseph', 'Shiela', 'Arlinda', 'Allegra')
generateSythenticData = function(id) {
  start = round(runif(1, 55, 80))
  end = round(runif(1, 95, 150))
  interval = (end - start)/16
  y = seq(start, end, interval)
  y = head(round(jitter(y, 10)), 10)
  values = paste(as.character(y), sep="' '", collapse=", ")
  v = paste('\t\t{\n\t\t\tname: "',  names[i], '",\n\t\t\tdata: [', values, ']\n\t\t},', sep="")
  write(v, file, append=TRUE)
}

start = '{
  labels: ["Sept", "PM1", "PM2", "PM3", "Oct", "PM4", "PM5", "Jan", "PM7", "PM8", "PM9", "Mar", "PM10", "PM11", "PM12", "MAY"],
  datasets:\n\t['
write(start, file, append=TRUE)
for(i in 1:15){
  generateSythenticData(i)
}
end = '\t]\n}'
write(end, file, append=TRUE)

