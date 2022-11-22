mylist=[
  {
    "resourceType": "teamleader", 
    "teamleaderID": 1, 
    "teamleaderName": "Adam"
  }, 
  {
    "resourceType": "teamleader", 
    "teamleaderID": 2, 
    "teamleaderName": "Faizan"
  }, 
  {
    "resourceType": "teamleader", 
    "teamleaderID": 4, 
    "teamleaderName": "Ahsan"
  }, 
  {
    "resourceType": "teamleader", 
    "teamleaderID": 6, 
    "teamleaderName": "ahsan3"
  }, 
  {
    "resourceType": "teamleader", 
    "teamleaderID": 7, 
    "teamleaderName": "temaleaderdummy2"
  }, 
  {
    "resourceType": "teamleader", 
    "teamleaderID": 8, 
    "teamleaderName": "leader9"
  }, 
  {
    "resourceType": "technician", 
    "technicianID": 1, 
    "technicianName": "tech1"
  }, 
  {
    "resourceType": "technician", 
    "technicianID": 2, 
    "technicianName": "tech2"
  }, 
  {
    "resourceType": "technician", 
    "technicianID": 3, 
    "technicianName": "Ahsan2"
  }, 
  {
    "resourceType": "technician", 
    "technicianID": 4, 
    "technicianName": "ahsan3"
  }, 
  {
    "resourceType": "technician", 
    "technicianID": 5, 
    "technicianName": "teamleader2"
  }, 
  {
    "resourceType": "technician", 
    "technicianID": 6, 
    "technicianName": "teamleader3"
  }, 
  {
    "resourceType": "technician", 
    "technicianID": 7, 
    "technicianName": "techdummy1"
  }
]
print(mylist.sort(key=lambda row: (row, row["resourceType"]), reverse=False))
