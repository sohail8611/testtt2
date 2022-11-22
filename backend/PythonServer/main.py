import json
from select import select
from flask import Flask, jsonify,render_template
from numpy import insert
from requests import request
import mysql.connector
import requests
from flask import request
from flask_cors import CORS


################## INSERT INTO `device` (`device_id`, `vehicle_id`, `device_type`, `device_mac`, `device_details`) VALUES (NULL, '4', 'none', 'adasda', 'ddadd'), (NULL, '5', 'ad', 'dd', 'dd');

app = Flask(__name__)
CORS(app)
# cnx = mysql.connector.connect(user='root', database='geidea_database',password="root")
#  "159.223.192.8:3306", "checking", "checking123"

# cnx = mysql.connector.connect(host="67.205.163.34",user="sohail",password="sohail123", database='geidea_portal',)
###Connection to database for every query or api etc
def dBconnection():
    host = '67.205.163.34' #Your server(host) name 
    user = "sohail"
    password = "sohail123"
    database = 'geidea_portal'  
    cnx = mysql.connector.connect(host=host,user=user,password=password, database=database,)
    return cnx

'''If everything works fine you will get a
message that Flask is working on the first
page of the application
'''
 
# @app.route('/teamleaderlist',methods = ['POST', 'GET'])
# def get_teamLeaderList():
#     print("helloww")

#     return render_template('geidea-master/tables/teamLeaderList.html')
    




# @app.route('/update_assign_teamleader_on_zone')
# def update_assign_teamLeader_on_zone():
#     cursor = cnx.cursor()
#     query = ("select teamLeaderName,zones.zoneName,cities.cityName,regionName from teamleaders inner join zones on teamleaders.teamLeaderID=zones.teamLeaderID inner join cities on zones.cityID=cities.cityID inner join regions on cities.regionID=regions.regionID")
#     cursor.execute(query)
#     data=[]
#     for i,j,k,l in cursor:
#         data.append({"teamLeaderName":i,"zoneName":j,"cityName":k,"regionName":l})
#     cursor.close()
#     return data.json()



# @app.route('/teamleaderlist_TabularData_API')
# def get_teamLeader_tabulardata_api():
#     cursor = cnx.cursor()
#     query = ("select teamLeaderName,zones.zoneName,cities.cityName,regionName from teamleaders inner join zones on teamleaders.teamLeaderID=zones.teamLeaderID inner join cities on zones.cityID=cities.cityID inner join regions on cities.regionID=regions.regionID")
#     cursor.execute(query)
#     data=[]
#     for i,j,k,l in cursor:
#         data.append({"teamLeaderName":i,"zoneName":j,"cityName":k,"regionName":l})
#     cursor.close()
#     return jsonify(data)



############################# HOW TO USE URLS #########################################
####### Example:   localhost:5000/teamleaderlist_TabularData_API ######################
####### In this case if we request the above URL we may get data to fill the table on temaleaderlist page #########


################################################################################################
################################## USERS & PERMISSIONS API URLs #####################################
################################################################################################

@app.route('/login',methods = ['POST'])
def login():
    credentials = request.json
    
    username = credentials['username']
    password = credentials['password']
    print("the username is:")
    print(username,password)
    cnx=dBconnection()   
    cursor = cnx.cursor()
    
    dbuser = "select id,username,type from users where username='{}' and password='{}'".format(username,password)
    cursor.execute(dbuser)
    user = {"id":None,"username":None,"type":None,"authenticated":False,}
    for i,j,k in cursor:
        user['id'] = i
        user['username'] = j
        user['type'] = k
        
    if user['id'] == None or user['username'] == None:
        return jsonify({"id":None,"username":None,"authenticated":False,})
    

    return jsonify({"id":user['id'],"username":user['username'],"type":user['type'],"authenticated":True,})








@app.route('/uploadbulkofterminals',methods = ['POST'])
def testpost():
    data=request.get_json()
    mystr=data["datastring"]
    mystr=mystr.rstrip(",")
    # print(x,"xis")
################## INSERT INTO `device` (`device_id`, `vehicle_id`, `device_type`, `device_mac`, `device_details`) VALUES (NULL, '4', 'none', 'adasda', 'ddadd'), (NULL, '5', 'ad', 'dd', 'dd');
    cnx=dBconnection()   
    cursor = cnx.cursor()
    query=("insert ignore into terminals (merchantName,product,active,mcc,merchantID,posType) values "+mystr)
    print(query,"queryis")
    cursor.execute(query)
    cnx.commit()
    return jsonify(mystr)


@app.route('/uploadbulkofteamleaders',methods = ['POST','GET'])
def uploadbulkofteamleaders():

    if request.method=='GET':
        return "get called"
    data=request.get_json()
    mystr=data["datastring"]
    mystr=mystr.rstrip(",")
    # print(x,"xis")
################## INSERT INTO `device` (`device_id`, `vehicle_id`, `device_type`, `device_mac`, `device_details`) VALUES (NULL, '4', 'none', 'adasda', 'ddadd'), (NULL, '5', 'ad', 'dd', 'dd');
    cnx=dBconnection()   
    cursor = cnx.cursor()
    query=("insert ignore into teamleaders (teamLeaderName) values "+mystr)
    print(query,"queryis")
    cursor.execute(query)
    cnx.commit()
    return jsonify(mystr)


@app.route('/uploadbulkoftechnicians',methods = ['POST','GET'])
def uploadbulkoftechnicians():

    if request.method=='GET':
        return "get called"
    data=request.get_json()
    mystr=data["datastring"]
    mystr=mystr.rstrip(",")
    # print(x,"xis")
################## INSERT INTO `device` (`device_id`, `vehicle_id`, `device_type`, `device_mac`, `device_details`) VALUES (NULL, '4', 'none', 'adasda', 'ddadd'), (NULL, '5', 'ad', 'dd', 'dd');
    cnx=dBconnection()   
    cursor = cnx.cursor()
    query=("insert ignore into technicians (technicianName) values "+mystr)
    print(query,"queryis")
    cursor.execute(query)
    cnx.commit()
    return jsonify(mystr)




@app.route('/get_permissions')
def get_permissions():
    cnx=dBconnection()      ###

    cursor = cnx.cursor()
    query = ("select * from userroles where type='teamleader'")
    cursor.execute(query)
    data=[]
    for i,j,k,l in cursor:
        data.append({"type":i,"manageZones":j,"manageSubzones":k,"manageTerminals":k})
    
    cursor.close()

    cnx.close()     ###
    return jsonify(data)










################################################################################################
################################## TeamLeaderList API URLs #####################################
################################################################################################


## Returns data to fill the table on teamleaderlist page ## --> METHOD = GET
@app.route('/teamleaderlist_TabularData_API')
def get_teamLeader():
    cnx=dBconnection()      ###

    cursor = cnx.cursor()
    query = ("select teamleaders.teamLeaderID,teamleaders.teamLeaderName,zones.zoneName,cities.cityName,regionName from teamleaders inner join zones on teamleaders.teamLeaderID=zones.teamLeaderID inner join cities on zones.cityID=cities.cityID inner join regions on cities.regionID=regions.regionID")
    cursor.execute(query)
    data=[]
    for id,i,j,k,l in cursor:
        data.append({"teamLeaderID":id,"teamLeaderName":i,"zoneName":j,"cityName":k,"regionName":l})
    
    cursor.close()

    cnx.close()     ###
    return jsonify(data)

@app.route('/teamleaderlist_TabularData_API/where/zonename=/<zonename>/')
def get_teamLeader_search_zonename(zonename):
    cnx=dBconnection()      ###

    cursor = cnx.cursor()
    query = ("select teamleaders.teamLeaderID,teamleaders.teamLeaderName,zones.zoneName,cities.cityName,regionName from teamleaders inner join zones on teamleaders.teamLeaderID=zones.teamLeaderID inner join cities on zones.cityID=cities.cityID inner join regions on cities.regionID=regions.regionID where zones.zoneName='{}'".format(zonename))
    cursor.execute(query)
    data=[]
    for id,i,j,k,l in cursor:
        data.append({"teamLeaderID":id,"teamLeaderName":i,"zoneName":j,"cityName":k,"regionName":l})
    
    cursor.close()

    cnx.close()     ###
    return jsonify(data)

@app.route('/teamleaderlist_TabularData_API/where/teamleadername=/<teamleadername>/')
def get_teamLeader_search_teamleadername(teamleadername):
    cnx=dBconnection()      ###

    cursor = cnx.cursor()
    query = ("select teamleaders.teamLeaderID,teamleaders.teamLeaderName,zones.zoneName,cities.cityName,regionName from teamleaders inner join zones on teamleaders.teamLeaderID=zones.teamLeaderID inner join cities on zones.cityID=cities.cityID inner join regions on cities.regionID=regions.regionID where teamleaders.teamLeaderName='{}'".format(teamleadername))
    cursor.execute(query)
    data=[]
    for id,i,j,k,l in cursor:
        data.append({"teamLeaderID":id,"teamLeaderName":i,"zoneName":j,"cityName":k,"regionName":l})
    
    cursor.close()

    cnx.close()     ###
    return jsonify(data)

## Returns data to fill the table on teamleaderlist page ## --> METHOD = GET
@app.route('/specific_teamleaderlist_TabularData_API/<int:teamleaderID>')
def get_specificteamLeader(teamleaderID):
    cnx=dBconnection()      ###

    cursor = cnx.cursor()
    query = ("select cities.cityID,regions.regionID,zones.zoneID,teamleaders.teamLeaderID,teamleaders.teamLeaderName,zones.zoneName,cities.cityName,regions.regionName from teamleaders inner join zones on teamleaders.teamLeaderID=zones.teamLeaderID inner join cities on zones.cityID=cities.cityID inner join regions on cities.regionID=regions.regionID where teamleaders.teamLeaderID={}".format(teamleaderID))
    cursor.execute(query)
    data=[]
    for cid,rid,zoneid,id,i,j,k,l in cursor:
        data.append({"cityID":cid,"regionID":rid,"zoneID":zoneid,"teamLeaderID":id,"teamLeaderName":i,"zoneName":j,"cityName":k,"regionName":l})
    
    cursor.close()

    cnx.close()     ###
    return jsonify(data)


@app.route('/createnewteamleader/<teamleadername>')
def createnewteamleader(teamleadername):

    cnx=dBconnection()      ###

    cursor = cnx.cursor()
    query = ("insert into teamleaders (teamLeaderName) values('{}') ".format(teamleadername))
    cursor.execute(query)
    cnx.commit()
    cursor.close()

    cnx.close()     ###
    return jsonify("responded")


@app.route('/technicianlist_TabularData_API')
def get_techncianstable():
    cnx=dBconnection()      ###

    cursor = cnx.cursor()
    query = ("select technicians.technicianID,technicians.technicianName,zones.zoneName,subzones.subzoneID,subzones.subzoneName,cities.cityName,regions.regionName FROM technicians inner JOIN subzonesundertechnicians on technicians.technicianID = subzonesundertechnicians.technicianID inner join subzones on subzonesundertechnicians.subZoneID = subzones.subZoneID inner JOIN zones on zones.zoneID = subzones.zoneID inner join cities on cities.cityID=zones.cityID inner join regions on regions.regionID=cities.regionID")
    cursor.execute(query)
    data=[]
    for id,i,j,k,thename,l,m in cursor:
        data.append({"technicianID":id,"technicianName":i,"zoneName":j,"subzoneName":k,"thesubzoneName":thename,"cityName":l,"regionName":m})
    
    cursor.close()

    cnx.close()     ###

    return jsonify(data)

@app.route('/technicianlist_TabularData_API/<int:technicianID>')
def get_specifictechncianstable(technicianID):
    cnx=dBconnection()      ###

    cursor = cnx.cursor()
    query = ("select zones.zoneID,regions.regionID,cities.cityID, technicians.technicianID,technicians.technicianName,zones.zoneName,subzones.subzoneID,subzones.subzoneName,cities.cityName,regions.regionName FROM technicians inner JOIN subzonesundertechnicians on technicians.technicianID = subzonesundertechnicians.technicianID inner join subzones on subzonesundertechnicians.subZoneID = subzones.subZoneID inner JOIN zones on zones.zoneID = subzones.zoneID inner join cities on cities.cityID=zones.cityID inner join regions on regions.regionID=cities.regionID where technicians.technicianID={}".format(technicianID))
    cursor.execute(query)
    data=[]
    for zid,rid,cid,id,i,j,k,thename,l,m in cursor:
        data.append({"zoneID":zid,"regionID":rid,"cityID":cid,"technicianID":id,"technicianName":i,"zoneName":j,"subzoneName":k,"thesubzoneName":thename,"cityName":l,"regionName":m})
    
    cursor.close()

    cnx.close()     ###
    return jsonify(data)

@app.route('/createnewtechnician/<technicianname>')
def creantenewtechnician(technicianname):

    cnx=dBconnection()      ###

    cursor = cnx.cursor()
    query = ("insert into technicians (technicianName) values('{}') ".format(technicianname))
    cursor.execute(query)
    cnx.commit()
    cursor.close()

    cnx.close()     ###
    return jsonify("responded")




@app.route('/getresourcetabulardata/')
def getResourceTable():

    cnx=dBconnection()      ###

    cursor = cnx.cursor()
    query = ("select * from teamleaders")
    cursor.execute(query)
    data=[]
    for i,j in cursor:
        data.append({"resourceID":str(i),"resourceName":j,"resourceType":"teamleader"})
    
    query = ("select * from technicians")
    cursor.execute(query)

    for i,j in cursor:
        data.append({"resourceID":str(i),"resourceName":j,"resourceType":"technician"})



    cursor.close()

    cnx.close()     ###
    return jsonify(data)


## delete teamleader
@app.route('/deleteresource/<int:resourceID>/type/<resourcetype>')
def deleteteammleaderresource(resourceID,resourcetype):
    cnx=dBconnection()
    cursor = cnx.cursor()

    if resourcetype == 'technician':
        query = ("delete from technicians where technicianID='{}'".format(resourceID))
    if resourcetype == 'teamleader':
        query = ("delete from teamleaders where teamleaderID='{}'".format(resourceID))
    cursor.execute(query)
    cnx.commit()
    cursor.close()
    cnx.close() 
    return jsonify(query)

@app.route('/updateresource/<int:resourceID>/type/<resourcetype>/resourceName/<resourceName>')
def updateresource(resourceID,resourcetype,resourceName):
    cnx=dBconnection()
    cursor = cnx.cursor()

    if resourcetype == 'technician':
        query = ("update technicians set technicianName='{}' where technicianID='{}'".format(resourceName,resourceID))
    if resourcetype == 'teamleader':
         query = ("update teamleaders set teamleaderName='{}' where teamleaderID='{}'".format(resourceName,resourceID))
    cursor.execute(query)
    cnx.commit()
    cursor.close()
    cnx.close() 
    return jsonify(query)


@app.route('/updatelocationsubzone/<int:subzoneID>/<updatedsubzonename>')
def updatesubzone(subzoneID,updatedsubzonename):
    cnx=dBconnection()
    cursor = cnx.cursor()


    query = ("update subzones set subzoneName='{}' where subzoneID='{}'".format(updatedsubzonename,subzoneID))
    
    cursor.execute(query)
    cnx.commit()
    cursor.close()
    cnx.close() 
    return jsonify(query)




## Returns data to fill the table on terminals page ## --> METHOD = GET
@app.route('/terminals_tabular_data')
def get_terminals_table():
    cnx=dBconnection()      ###

    cursor = cnx.cursor()
    query = ("select * from terminals")
    cursor.execute(query)
    data=[]
    for i,j,k,l,m,n,o in cursor:
        data.append({"merchantName":i,"product":j,"active":k,"mcc":l,"merchantID":m,"posType":n,"terminalID":o})
    
    cursor.close()

    cnx.close()     ###
    return jsonify(data)

## Returns list of teamleaders ## --> METHOD = GET
@app.route('/get_all_teamleaderslist')
def get_all_teamleaderslist():

    cnx=dBconnection()  ###

    cursor = cnx.cursor()
    query = ("select teamLeaderID,teamLeaderName from teamleaders")
    cursor.execute(query)
    data=[]
    data.clear()
    for i,j in cursor:
        data.append({"teamLeaderID":i,"teamLeaderName":j})
    cursor.close()
    
    
    cnx.close()
    return jsonify(data)


## Returns list of all regions ## --> METHOD = GET
@app.route('/get_all_region_list')
def get_all_regions():
    cnx=dBconnection()  ###

    cursor = cnx.cursor()
    query = ("select regionID,regionName from regions")
    cursor.execute(query)
    data=[]
    for i,j in cursor:
        data.append({"regionID":i,"regionName":j})
    cursor.close()

    cnx.close()
    return jsonify(data)



## Returns list of all zones in a city if 'cityId' is provided in URL ## --> METHOD = GET
        #Exmple:   "localhost:5000/get_all_zones_in_city/3"   #where 3 represents cityId
@app.route('/get_all_zones_in_city/<int:cityID>')
def get_all_cities_in_region(cityID):

    cnx=dBconnection()

    cursor = cnx.cursor()
    query = ("select zoneID,zoneName,coordinates from zones where cityID={}".format(cityID))
    cursor.execute(query)

    allzonescoordinates=[]
    
    thejsonboundry={}
    data=[]
    for i,j,k in cursor:
        data.append({"zoneID":i,"zoneName":j,"cityID":cityID,"coordinates":k})
        allzonescoordinates.append(k)
    cursor.close()
    thejsonboundry["theData"]=data
    thejsonboundry["allzonescoordinates"]=allzonescoordinates
    cnx.close()
    return jsonify(thejsonboundry)

@app.route('/deleteassignedteamleaderfromzone/<int:zoneID>')
def deleteassignedteamleaderfromzone(zoneID):

    cnx=dBconnection()

    cursor = cnx.cursor()
    query = ("update  zones set teamleaderid=404 WHERE zoneID={}".format(zoneID))
    cursor.execute(query)
    cnx.commit()
    # data=[]
    # for i,j,k,l,m in cursor:
    #     data.append({"technicianName":i,"subZoneID":j,"zoneName":k,"cityName":l,"regionName":m})
    
    cursor.close()

    cnx.close() 
    return jsonify(query)

@app.route('/get_all_zones_list')
def get_all_zones_list():

    cnx=dBconnection()

    cursor = cnx.cursor()
    query = ("select zoneID,zoneName from zones")
    cursor.execute(query)
    data=[]
    for i,j in cursor:
        data.append({"zoneID":i,"zoneName":j})
    cursor.close()

    cnx.close()
    return jsonify(data)


## Returns List of all cities in a region if 'regionId' is provided in URL ## --> METHOD = GET
        #Exmple:   "localhost:5000/get_all_cities_in_region/2"    #where 2 represents regionId #
@app.route('/get_all_cities_in_region/<int:regionID>')
def get_all_zones_in_city(regionID):

    cnx=dBconnection()  ###

    cursor = cnx.cursor()
    query = ("select cityID,cityName from cities where regionID={}".format(regionID))
    cursor.execute(query)
    data=[]
    for i,j in cursor:
        data.append({"cityID":i,"cityName":j,"regionID":regionID})
    cursor.close()

    cnx.close()
    return jsonify(data)


@app.route('/get_all_subzones_in_zones/<int:zoneID>')
def get_all_subzones_in_zone(zoneID):

    cnx=dBconnection()  ###

    
    allsubzonescoordinates=[]
    
    thejsonboundry={}
  
    
  


    cursor = cnx.cursor()
    query = ("select subzoneName,subZoneID,coordinates from subzones where zoneID={}".format(zoneID))
    cursor.execute(query)
    data=[]
    data.clear()
    for name,i,j in cursor:
        data.append({"subzoneName":name,"subzoneID":i,"coordinates":j})
        allsubzonescoordinates.append(j)

    thejsonboundry["theData"]=data
    thejsonboundry["allsubzonescoordinates"]=allsubzonescoordinates
    cursor.close()
    
    
    cnx.close()
    return jsonify(thejsonboundry)

######################### UPDATE/CREATE ########################

@app.route('/updateZoneforteamleader/<int:teamleaderID>/<int:zoneID>/<int:currentzoneID>')
def update_assignedzones(teamleaderID,zoneID,currentzoneID):
    cnx=dBconnection()      ###
    # email = request.form.get('user')
    # return jsonify(zoneID)
    cursor = cnx.cursor()
    query1 = ("update zones set teamLeaderID={} where zoneID={}; ".format(teamleaderID,zoneID))
    query2 = ("update zones set teamLeaderID=404 where zoneID={}; ".format(currentzoneID))

    cursor.execute(query1)
    cursor.execute(query2)
    cnx.commit()
    # data=[]
    # for i,j,k,l,m in cursor:
    #     data.append({"technicianName":i,"subZoneID":j,"zoneName":k,"cityName":l,"regionName":m})
    
    cursor.close()

    cnx.close()     ###
    return jsonify(query1+query2)



##Assign new zone to a teamleader
@app.route('/assignZonetoteamleader/<int:teamleaderID>/<int:zoneID>')
def assignnewzonetoteamleader(teamleaderID,zoneID):
    cnx=dBconnection()      ###
    # email = request.form.get('user')
    # return jsonify(zoneID)
    cursor = cnx.cursor()
    query1 = ("update zones set teamLeaderID={} where zoneID={}; ".format(teamleaderID,zoneID))

    cursor.execute(query1)
    
    cnx.commit()
    # data=[]
    # for i,j,k,l,m in cursor:
    #     data.append({"technicianName":i,"subZoneID":j,"zoneName":k,"cityName":l,"regionName":m})
    
    cursor.close()

    cnx.close()     ###
    return jsonify(query1)


@app.route('/technician-update/<int:technicianID>/<int:subzoneID>')
def update_assignedsubzones(technicianID,subzoneID):
    cnx=dBconnection()      ###
    
    
    # email = request.form.get('user')
    # return jsonify(zoneID)
    cursor = cnx.cursor()
    query1 = ("delete from subzonesundertechnicians where subzoneID={} and technicianID={}".format(subzoneID,technicianID))
    query2=("insert into subzonesundertechnicians values('{}','{}')".format(subzoneID,technicianID))
    
    cursor.execute(query1)
    cursor.execute(query2)
    cnx.commit()
   
    # else:
    #     query = ("update subzonesundertechnicians set technicianID={} where subzoneID={}; ".format(technicianID,subzoneID))

    # cursor.execute(query)
    # cnx.commit()
    # # data=[]
    # # for i,j,k,l,m in cursor:
    # #     data.append({"technicianName":i,"subZoneID":j,"zoneName":k,"cityName":l,"regionName":m})
    
    cursor.close()

    cnx.close()     ###
    return jsonify(str(query1)+str(query2))



################################################################################################
################################## Technicians List API URLs ###################################
################################################################################################


@app.route('/get_all_technicianslist')
def get_all_technicianlist():

    cnx=dBconnection()  ###

    cursor = cnx.cursor()
    query = ("select technicianID,technicianName from technicians")
    cursor.execute(query)
    data=[]
    data.clear()
    for i,j in cursor:
        data.append({"technicianID":i,"technicianName":j})
    cursor.close()
    
    
    cnx.close()
    return jsonify(data)


@app.route('/get_all_subzones')
def get_all_subzones():

    cnx=dBconnection()  ###

    cursor = cnx.cursor()
    query = ("select subZoneID from subzones")
    cursor.execute(query)
    data=[]
    data.clear()
    for i in cursor:
        data.append({"subzoneID":i})
    cursor.close()
    
    
    cnx.close()
    return jsonify(data)


@app.route('/updatesubZonefortechnician/<int:technicianID>/<int:subzoneID>/<int:currentsubzoneID>')
def replace_assignedsubzones(technicianID,subzoneID,currentsubzoneID):
    cnx=dBconnection()      ###
    
    
    # email = request.form.get('user')
    # return jsonify(zoneID)
    cursor = cnx.cursor()
    
    query1 = ("update subzonesundertechnicians set subZoneID={} where subZoneID={} and technicianID={}; ".format(subzoneID,currentsubzoneID,technicianID))
   

    if subzoneID == currentsubzoneID:
        pass
    else:
        cursor.execute(query1)
        cnx.commit()
        # data=[]
        # for i,j,k,l,m in cursor:
        #     data.append({"technicianName":i,"subZoneID":j,"zoneName":k,"cityName":l,"regionName":m})
        
        cursor.close()

        cnx.close()     ###
    return jsonify(query1)







################################################################################################
################################## Locations API URLs ###################################
################################################################################################



@app.route('/getalllocations')
def get_allLocations():
    cnx=dBconnection()      ###

    cursor = cnx.cursor()
    query = ("select regions.regionID,regions.regionName, cities.cityID,cities.cityName,zones.zoneID,zones.zoneName,subzones.subzoneID,subzones.subzoneName from regions inner join cities on regions.regionID=cities.regionID inner join zones on cities.cityID=zones.cityID left join subzones on zones.zoneID=subzones.zoneID")
    cursor.execute(query)
    data=[]
    for id,i,j,k,l,m,n,thename in cursor:
        data.append({"regionID":id,"regionName":i,"cityID":j,"cityName":k,"zoneID":l,"zoneName":m,"subzoneID":n,"thesubzoneName":thename})
    
    cursor.close()

    cnx.close()     ###
    return jsonify(data)



@app.route('/removesubzone/<int:subzoneID>')
def removesubzone(subzoneID):

    cnx=dBconnection()

    cursor = cnx.cursor()
    # DELETE FROM table_name WHERE condition;
    query1 = ("delete from subzones where subzoneID={}".format(subzoneID))
    query2 = ("delete from subzonesundertechnicians where subzoneID={}".format(subzoneID))
    cursor.execute(query1)
    cursor.execute(query2)
    cnx.commit()
    # data=[]
    # for i,j,k,l,m in cursor:
    #     data.append({"technicianName":i,"subZoneID":j,"zoneName":k,"cityName":l,"regionName":m})
    
    cursor.close()

    cnx.close() 
    return jsonify(query1+query2)




@app.route('/unassignsubzone/<int:subzoneID>/<int:technicianID>/')
def unassignsubzone(subzoneID,technicianID):

    cnx=dBconnection()

    cursor = cnx.cursor()
    # DELETE FROM table_name WHERE condition;
    query = ("delete from subzonesundertechnicians where subzoneID={} and technicianID={} ".format(subzoneID,technicianID))
    
    cursor.execute(query)
    cnx.commit()
    # data=[]
    # for i,j,k,l,m in cursor:
    #     data.append({"technicianName":i,"subZoneID":j,"zoneName":k,"cityName":l,"regionName":m})
    
    cursor.close()

    cnx.close() 
    return jsonify(query)



###########################################################################33
############################ ADD RESOURCES ################################33
###########################################################################33

@app.route('/AddTechnician/<subzoneID>/<int:technicianID>/')
def addResources(subzoneID,technicianID):

    cnx=dBconnection()

    cursor = cnx.cursor()
    # DELETE FROM table_name WHERE condition;
    query = ("delete from subzonesundertechnicians where subzoneID={} and technicianID={} ".format(subzoneID,technicianID))
    
    cursor.execute(query)
    cnx.commit()
    # data=[]
    # for i,j,k,l,m in cursor:
    #     data.append({"technicianName":i,"subZoneID":j,"zoneName":k,"cityName":l,"regionName":m})
    
    cursor.close()

    cnx.close() 
    return jsonify(query)

# @app.route('/technicianlist')
# def get_technicianList():
#     return render_template('Geidea-master/tables/technicianList.html')
#SELECT technicians.technicianName,zones.zoneID,subzones.subZoneID,cities.cityID,regions.regionID FROM technicians inner JOIN subzonesundertechnicians on technicians.technicianID = subzonesundertechnicians.technicianID inner join subzones on subzonesundertechnicians.subZoneID = subzones.subZoneID inner JOIN zones on zones.zoneID = subzones.zoneID inner join cities on cities.cityID=zones.cityID inner join regions on regions.regionID=cities.regionID


@app.route('/createnewzone',methods = ['POST'])
def createnewzone():

    data=request.get_json()
    thecoords=data['datastring']["coordinates"]
    thecityID=data['datastring']['cityID']
    zoneNameText=data['datastring']['zoneNameText']
    thecoords=str(thecoords)
    thecoords=thecoords.replace("'",'"')
 
    cnx=dBconnection()
    cursor = cnx.cursor()
   
    query=("insert into zones (cityID,coordinates,zoneName) values('{}','{}','{}')".format(thecityID,thecoords,zoneNameText))
   
    cursor.execute(query)
    cnx.commit()
    cursor.close()

    cnx.close() 
    
  
    return jsonify(data)



@app.route('/createnewsubzone',methods = ['POST'])
def createnewsubzone():

    data=request.get_json()
    thecoords=data['datastring']["coordinates"]
    thezoneID=data['datastring']['zoneID']
    subzoneName=data['datastring']['subzoneName']
    
    thecoords=str(thecoords)
    thecoords=thecoords.replace("'",'"')
    
    print(thezoneID,"<<iszoneid")
    cnx=dBconnection()
    cursor = cnx.cursor()
   
    query=("insert into subzones (zoneID,coordinates,subzoneName) values('{}','{}','{}')".format(thezoneID,thecoords,subzoneName))
   
    cursor.execute(query)
    cnx.commit()
    cursor.close()

    cnx.close() 

    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True,port=1143)