from flaskserver import db, bcrypt, app, Account
from flask import request, jsonify
from flask_jwt_extended import create_access_token, set_access_cookies, unset_jwt_cookies, get_jwt_identity, get_jwt, jwt_required
from datetime import datetime, timedelta, timezone

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = Account.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        response = jsonify({"msg": "login successful"})
        access_token = create_access_token(identity=username)
        set_access_cookies(response, access_token)
        return {"msg": "login successful", "token": access_token, "avatar": user.avatar}, 200

    return {"msg": "username or password is wrong"}, 400


@app.route("/logout", methods=['POST'])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        return response


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "username": user.username }), 200