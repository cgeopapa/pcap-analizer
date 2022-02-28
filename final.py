from flask import Flask, request, Response,jsonify, render_template
from bson.json_util import dumps
from bson.objectid import ObjectId
from itsdangerous import json
import requests
from flask_cors import CORS, cross_origin
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from werkzeug.utils import secure_filename
import os
import subprocess
from pymongo import MongoClient

app = Flask(__name__, static_url_path="/")

UPLOAD_FOLDER = '/home/ubuntu/threat-hunter/uploads'
app.secret_key = None
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = set(['pcap'])
mongo_ip = '192.168.105.105'

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

app.config['MONGO_URI'] = 'mongodb://{}:27017'.format(mongo_ip)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

mongo = MongoClient(mongo_ip, 27017)
db = ""

#################################################################### BEACONS ####################################################################
@app.route('/', methods=['GET'])
@cross_origin()
def index():
    return render_template("index.html")

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

#################################################################### PORTS2DB ###################################################################
def port2db():
    # ports = mongo.db.ports
    # ports.drop()
    # ports = mongo.db.ports

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

#################################################################### COLLECTIONS ####################################################################
@app.route('/collections', methods=['GET'])
@cross_origin()
def collections():
    dbs = mongo.list_database_names()
    dbs_filtered = []
    for db in dbs:
        if db.startswith("dataset_"):
            dbs_filtered.append(db)
    return jsonify({"collections": dbs_filtered})

@app.route('/collection_set', methods=['POST'])
@cross_origin()
def collection_set():
    col = request.args.get("col")
    if col.startswith("dataset_"):
        db = col
        return 200
    else:
        return jsonify({"error": "The selected collection is not a pkap analysis collection."}), 200

@app.route('/collection', methods=['DELETE'])
@cross_origin()
def collection_delete():
    col = request.args.get("col")
    if col.startswith("dataset_"):
        mongo.drop_database(col)
        return 200
    else:
        return jsonify({"error": "The selected collection is not a pkap analysis collection."}), 200

@app.route('/collection', methods=['POST'])
@cross_origin()
def chd():
    if 'file' not in request.files:
        print('No file part')
        return jsonify({"error": 'No file part.'}), 200
    file = request.files['file']
    if 'colName' not in request.form or request.form['colName'] == '':
        print('No collection name')
        return jsonify({"error": 'No collection name.'}), 200
    colName = request.form['colName']
    if file and allowed_file(file.filename):
        filename = secure_filename("dataset_"+file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        print('File successfully uploaded')
        #Path where log files are stored
        PATH_TO_LOGS = os.path.join(app.config['UPLOAD_FOLDER'], "logs")
        DATASET_NAME = "dataset_"+colName
        # subprocess.check_call(['/home/ubuntu/project/script.sh', app.config['UPLOAD_FOLDER'], filename, DATASET_NAME, PATH_TO_LOGS])
        return jsonify(success=True)
    else:
        print('Allowed file types are pcap')
        return jsonify({"error": 'Allowed file types are pcap'}), 200


if __name__ == '__main__':
    # port2db()
    app.run(host= '0.0.0.0')
