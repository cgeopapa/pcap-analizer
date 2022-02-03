from flask import Flask, request, Response,jsonify
from flask_pymongo import PyMongo, pymongo
from bson.json_util import dumps
from bson.json_util import loads
from bson.objectid import ObjectId
import json
import requests
from flask_cors import CORS, cross_origin
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import sys

app = Flask(__name__)

if ( len(sys.argv) == 2 ):
    dbname = str(sys.argv[1])
    mongouri = 'mongodb://192.168.105.105:27017/'+dbname
    app.config['MONGO_DBNAME'] = dbname
    app.config['MONGO_URI'] = mongouri
else:
    app.config['MONGO_DBNAME'] = 'dataset1'
    app.config['MONGO_URI'] = 'mongodb://192.168.105.105:27017/dataset_1'

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

mongo = PyMongo(app)

#################################################################### BEACONS ####################################################################
@app.route('/beacondetails', methods=['GET'])
@cross_origin()
def beacon_id():
    if request.method == 'GET':
        queryparams = request.args
        beacon = mongo.db.beacon
        query = {}
        display = ['score', 'src', 'dst', 'connection_count', 'avg_bytes',
        'ds.counts', 'ds.sizes',
        'ts.interval_counts', 'ts.intervals',
        'ts.range', 'ts.mode', 'ts.mode_count', 'ts.skew', 'ts.dispersion', 'ts.score',
        'ds.range', 'ds.mode', 'ds.mode_count', 'ds.skew', 'ds.dispersion', 'ds.score']

        # Query Parameters
        if ('objid' in queryparams):
            objid = queryparams.get('objid')
            query["_id"] = {"$eq" : ObjectId(objid)}
        

        if (query is not None):
            result = beacon.find( query , display ).sort("score",-1)
              
    #return dumps(result)
    return Response(dumps(result),  mimetype='application/json')

@app.route('/beacons_by_score', methods=['GET'])
@cross_origin()
def beacon_by_score():
    if request.method == 'GET':
        queryparams = request.args
        beacon = mongo.db.beacon
        query = {}
        display = ['score', 'src', 'dst']

        # Query Parameters
        if ('score' in queryparams):
            score = float(queryparams.get('score'))
            query["score"] = {"$gte" : score}

        result = beacon.find( query , display ).sort("score",-1)
              
    #return dumps(result)
    return Response(dumps(result),  mimetype='application/json')

@app.route('/beacons_by_srcip', methods=['GET'])
@cross_origin()
def beacon_by_srcip():
    if request.method == 'GET':
        queryparams = request.args
        beacon = mongo.db.beacon
        query = {}
        display = ['score', 'src', 'dst']

        # Query Parameters
        if ('srcip' in queryparams):
            srcip = queryparams.get('srcip')
            query["src"] = {"$eq" : srcip}

        result = beacon.find( query , display ).sort("score",-1)
              
    #return dumps(result)
    return Response(dumps(result),  mimetype='application/json')

@app.route('/beacons_by_dstip', methods=['GET'])
@cross_origin()
def beacon_by_dstip():
    if request.method == 'GET':
        queryparams = request.args
        beacon = mongo.db.beacon
        query = {}
        display = ['score', 'src', 'dst']

        # Query Parameters
        if ('dstip' in queryparams):
            dstip = queryparams.get('dstip')
            query["dst"] = {"$eq" : dstip}

        result = beacon.find( query , display ).sort("score",-1)
              
    #return dumps(result)
    return Response(dumps(result),  mimetype='application/json')


@app.route('/beacons', methods=['GET'])
@cross_origin()
def beacons():
    if request.method == 'GET':
        beacon = mongo.db.beacon
        query = {}
        display = ['score', 'src', 'dst']

        if (query is not None):
            result = beacon.find( {} , display).sort("score",-1)

    return Response(dumps(result),  mimetype='application/json')
    

#################################################################### UCONN ##################################################################
@app.route('/uconns', methods=['GET'])
@cross_origin()
def uconns():
    if request.method == 'GET':
        uconn = mongo.db.uconn
        query = {}
        display = ['src', 'dst', 'dat.maxdur', 'dat.tdur', 'dat.tuples']

        if (query is not None):
            print(type(uconn))
            result = uconn.find( {} , display).sort("dat.maxdur",-1)              

    #return dumps(result)
    return Response(dumps(result),  mimetype='application/json')

#################################################################### DNS ####################################################################
@app.route('/dns', methods=['GET'])
@cross_origin()
def dns():
    if request.method == 'GET':
        dns = mongo.db.explodedDns
        query = {}
        display = ['domain', 'subdomain_count', 'dat.visited']

        if (query is not None):
            result = dns.find( {} , display).sort("subdomain_count",-1)              

    #return dumps(result)
    return Response(dumps(result),  mimetype='application/json')

#################################################################### USERAGENTS #############################################################
@app.route('/uagents', methods=['GET'])
@cross_origin()
def uagents():
    if request.method == 'GET':
        uagent = mongo.db.useragent
        query = {}
        display = ['user_agent', 'dat.seen']

        if (query is not None):
            result = uagent.find( {} , display).sort("dat.seen",-1)              

    #return dumps(result)
    return Response(dumps(result),  mimetype='application/json')

#################################################################### PORTS ######################################################################
@app.route('/portsinfo', methods=['GET'])
@cross_origin()
def ports():
    if request.method == 'GET':
        queryparams = request.args
        port = mongo.db.ports
        query = {}
        display = ['port', 'count', 'protocol']

        if ('srcip' in queryparams):
            srcip = queryparams.get('srcip')
            query["src"] = {"$eq" : srcip}

        if ('dstip' in queryparams):
            dstip = queryparams.get('dstip')
            query["dst"] = {"$eq" : dstip}

        if ('protocol' in queryparams):
            protocol = queryparams.get('protocol')
            query["protocol"] = {"$eq" : protocol}
        
        if (query is not None):
            #result = port.find( query , display).sort("count",-1)
            # num = int( port.find( query , display ).count() )
            # num = int( port.find( query , display )) 
            if ('n' in queryparams):
                x = int( queryparams.get('n') )
                # x = min(n, num)
                result = port.find( query , display).sort("count",-1).limit(x).sort("count", -1)
                print(x)


    return Response(dumps(result),  mimetype='application/json')

# #################################################################### PORTS ######################################################################
# @app.route('/dnsinfo', methods=['GET'])
# @cross_origin()
# def dnsinfo():
#     if request.method == 'GET':
#         queryparams = request.args
#         dns = mongo.db.dns
#         query = {}
#         display = ['src', 'dst', 'dns', 'count']

#         if ('srcip' in queryparams):
#             srcip = queryparams.get('srcip')
#             query["src"] = {"$eq" : srcip}

#         if ('dstip' in queryparams):
#             dstip = queryparams.get('dstip')
#             query["dst"] = {"$eq" : dstip}
        
#         if (query is not None):
#             result = dns.find( query , display).sort("count",-1)
#         else:
#             result = dns.find( {} , display ).sort("count", -1)

#     return Response(dumps(result),  mimetype='application/json')


#################################################################### PORTS2DB ###################################################################
def port2db():

    ports = mongo.db.ports
    ports.drop()
    ports = mongo.db.ports

    # dns = mongo.db.dns
    # dns.drop()
    # dns = mongo.db.dns

    tcp = mongo.db.tcpp
    result = tcp.aggregate([
        {"$group": {
            "_id": {
                "src": "$src",
                "dst": "$dst",
                "port": "$port",
                "protocol": "tcp"
            },
            "count": {"$sum":1}
        }}
    ])
    result = list(result)
    for i in result:
        k = i['_id']
        k1 = k['src']
        k2 = k['dst']
        k3 = k['port']
        k4 = k['protocol']
        k5 = i['count']
        dic = { "src": k1, "dst": k2, "port": k3, "protocol": k4, "count": k5}
        x = ports.insert_one(dic)
    
    udp = mongo.db.udpp
    result = udp.aggregate([
        {"$group": {
            "_id": {
                "src": "$src",
                "dst": "$dst",
                "port": "$port",
                "protocol": "udp"
            },
            "count": {"$sum":1}
        }}
    ])
    result = list(result)
    for i in result:
        k = i['_id']
        k1 = k['src']
        k2 = k['dst']
        k3 = k['port']
        k4 = k['protocol']
        k5 = i['count']
        dic = { "src": k1, "dst": k2, "port": k3, "protocol": k4, "count": k5}
        x = ports.insert_one(dic)
    
    # dnsc = mongo.db.dnsc
    # result = dnsc.aggregate([
    #     {"$group": {
    #         "_id": {
    #             "src": "$src",
    #             "dst": "$dst",
    #             "dns": "$dns"
    #         },
    #         "count": {"$sum":1}
    #     }}
    # ])
    # result = list(result)
    # for i in result:
    #     k = i['_id']
    #     k1 = k['src']
    #     k2 = k['dst']
    #     k3 = k['dns']
    #     k4 = i['count']
    #     dic = { "src": k1, "dst": k2, "dns": k3, "count": k4}
    #     x = dns.insert_one(dic)

################################################################## VIRUSTOTAL #################################################################
@app.route('/vtinfo', methods=['GET'])
@cross_origin()
def vtinfo():
    if request.method == 'GET':

        vt = mongo.db.vt
        vt.drop()
        vt = mongo.db.vt

        queryparams = request.args
        #VT
        my_Api_Key = '0bfc00fe9d141d4edf54823da4c68440282a961e9b4bb6f2b00d8ce08d57bdd6'
        #AIP
        options = Options()
        options.headless = True
        if ('ip' in queryparams):
            ip = queryparams.get('ip')
            ips = str(ip)
            #VT
            URL = 'https://www.virustotal.com/vtapi/v2/ip-address/report?apikey=' + my_Api_Key + '&ip=' + ip
            r = requests.get(url = URL)
            data = r.json()
            #AIP
            driver = webdriver.Firefox(options = options)
            driver.get('https://www.abuseipdb.com/check/' + ip)
            element2 = driver.find_element_by_xpath("//div[@class='well']")
            try:
                resi = {
                    'AIP_times_reported' : str(element2.find_elements_by_xpath(".//b")[1].text),
                    'AIP_confidence_of_abuse' : str(element2.find_elements_by_xpath(".//b")[2].text),
                    'AIP_isp_provider' : str(element2.find_elements_by_xpath(".//td")[0].text),
                    'AIP_domain_name' : str(element2.find_elements_by_xpath(".//td")[2].text),
                    'VT_Country': str( data['country'] ),
                    'VT_Positives': data['detected_urls'][0]['positives'] ,
                    'VT_Total': data['detected_urls'][0]['total'] ,
                    'VT_Percentage': (int( data['detected_urls'][0]['positives'] )/int( data['detected_urls'][0]['total'] ))*100,
                    'VT_Hostname': str( data['resolutions'][0]['hostname'] )
                 }
            except IndexError:
                if ips.startswith('192.168'):
                    resi = {
                        'AIP_times_reported' : 0,
                        'AIP_confidence_of_abuse' :0,
                        'AIP_isp_provider' : 'Private IP',
                        'AIP_domain_name' : 'None',
                        'VT_Country': 'Private IP',
                        'VT_Positives': 0,
                        'VT_Total': 1,
                        'VT_Percentage': 0,
                        'VT_Hostname': 'None'
                    }
                else:
                    resi = {
                        'AIP_times_reported' : 0,
                        'AIP_confidence_of_abuse' :0,
                        'AIP_isp_provider' : str(element2.find_elements_by_xpath(".//td")[0].text),
                        'AIP_domain_name' : str(element2.find_elements_by_xpath(".//td")[2].text),
                        'VT_Country': str( data['country'] ),
                        'VT_Positives': 0,
                        'VT_Total': 1,
                        'VT_Percentage': 0,
                        'VT_Hostname': str( data['resolutions'][0]['hostname'] )
                    }
            
            vt.insert_one(resi)
            result = vt.find( {} )

            return Response(dumps(result),  mimetype='application/json')            
        else:
            e0 = 'No IP Was Given!'
            return e0

if __name__ == '__main__':
    port2db()
    app.run(host= '0.0.0.0')