from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from config import Config
from flask_cors import CORS
import jwt
import datetime
import random
from bson.objectid import ObjectId

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

mongo = PyMongo(app)

# Helper function to generate JWT token
def generate_jwt(user_id):
    token = jwt.encode({
        'user_id': str(user_id),
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, app.config['SECRET_KEY'], algorithm='HS256')
    return token

# 1. Worker Registration (POST)
@app.route('/api/worker/register', methods=['POST'])
def worker_register():
    data = request.get_json()
    worker = {
        'name': data.get('name'),
        'skills': data.get('skills'),
        'experience': data.get('experience'),
        'location': data.get('location'),
        # Optionally, store latitude and longitude if provided:
        'lat': data.get('lat', '19.0760'),
        'lng': data.get('lng', '72.8777'),
        'rating': None,
        'otp': random.randint(100000, 999999)  # OTP for demo purposes
    }
    result = mongo.db.workers.insert_one(worker)
    return jsonify({'message': 'Worker registered', 'otp': worker['otp'], 'worker_id': str(result.inserted_id)}), 201

# 2. Employer Registration (POST)
@app.route('/api/employer/register', methods=['POST'])
def employer_register():
    data = request.get_json()
    employer = {
        'name': data.get('name'),
        'business_name': data.get('business_name'),
        'contact': data.get('contact'),
        'jobs_posted': []
    }
    result = mongo.db.employers.insert_one(employer)
    return jsonify({'message': 'Employer registered', 'employer_id': str(result.inserted_id)}), 201

# 3. Get Worker Profiles (GET) with search filters
@app.route('/api/workers', methods=['GET'])
def get_workers():
    location = request.args.get('location')
    skills = request.args.get('skills')
    rating = request.args.get('rating')
    query = {}
    if location:
        query['location'] = location
    if skills:
        query['skills'] = { '$regex': skills, '$options': 'i' }
    if rating:
        query['rating'] = float(rating)
    workers = list(mongo.db.workers.find(query))
    for worker in workers:
        worker['_id'] = str(worker['_id'])
    return jsonify(workers), 200

# 4. Job Posting & Notifications (POST)
@app.route('/api/job/post', methods=['POST'])
def post_job():
    data = request.get_json()
    job = {
        'title': data.get('title'),
        'description': data.get('description'),
        'employer_id': data.get('employer_id'),
        'date_posted': datetime.datetime.utcnow()
    }
    result = mongo.db.jobs.insert_one(job)
    return jsonify({'message': 'Job posted', 'job_id': str(result.inserted_id)}), 201

# 5. Payment & Hiring Confirmation (POST)
@app.route('/api/payment/confirm', methods=['POST'])
def payment_confirm():
    data = request.get_json()
    # Simulate payment confirmation; integrate a real payment gateway as needed.
    payment_status = "Success"
    return jsonify({'message': 'Payment confirmed', 'status': payment_status}), 200

# 6. OTP Verification for Worker (POST)
@app.route('/api/worker/verify', methods=['POST'])
def verify_worker():
    data = request.get_json()
    worker_id = data.get('worker_id')
    otp = data.get('otp')
    worker = mongo.db.workers.find_one({'_id': ObjectId(worker_id)})
    if worker and str(worker.get('otp')) == str(otp):
        # Remove the OTP once verified
        mongo.db.workers.update_one({'_id': worker['_id']}, {'$unset': {'otp': ""}})
        token = generate_jwt(worker_id)
        return jsonify({'message': 'OTP verified', 'token': token}), 200
    else:
        return jsonify({'message': 'OTP verification failed'}), 400

# (Optional) Endpoint for Job Alerts (GET)
@app.route('/api/job/alerts', methods=['GET'])
def job_alerts():
    alerts = list(mongo.db.jobs.find().sort('date_posted', -1))
    for alert in alerts:
        alert['_id'] = str(alert['_id'])
    return jsonify(alerts), 200

if __name__ == '__main__':
    app.run(debug=True)
