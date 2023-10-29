from flask import Flask, jsonify, render_template,request, session,url_for,redirect,flash
import mysql.connector
from flask_cors import CORS

from flask_cors import CORS
import re
app = Flask(__name__)
CORS(app)  

@app.route('/api/data')
def get_data():
    data = {"message": "Hello from the Flask backend!"}
    return jsonify(data)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.json

        # Get registration data from the request
        email = data.get('email')
        password = data.get('password')
        role = data.get('role')

        try:
            connection = mysql.connector.connect(
                host="localhost",
                user="root",
                password="root1234",
                database="projectdatabase"
                )
            cursor = connection.cursor()

            # Query the appropriate table (student or educator) based on the role
            cursor.execute(f'SELECT * FROM {role} WHERE email=%s', (email,))
            user = cursor.fetchone()

            if user:
                user_id, _, stored_password, _ = user
                if password == stored_password:
                    flash('Login successful!', 'success')
                    session['user_id'] = user_id
                    if role == 'student':
                        return redirect(url_for('studentdashboard'))
                    elif role == 'educator':
                        return redirect(url_for('educatordashboard'))
                else:
                    flash('Invalid password. Try again.', 'danger')
            else:
                flash('User not found. Try again.', 'danger')

            connection.close()
        except mysql.connector.Error as err:
            flash('Database error: ' + str(err), 'danger')

        return render_template('login.html')

# @app.route('/logout')
# @login_required
# def logout():
#     logout_user()  # Log out the user
#     flash('You have been logged out.', 'info')
#     return redirect(url_for('login'))

@app.route('/signup', methods=['GET', 'POST'])
def register():
    
    if request.method == 'POST':
        data = request.json

        
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        try:
            connection = mysql.connector.connect(
                host="localhost",
                user="root",
                password="",
                database="demoexpensetwo"
            )
            cursor = connection.cursor()

            cursor.execute('SELECT * FROM register WHERE username = %s', (username,))
            account = cursor.fetchone()
            print(account)
            if account:
                flash('Account already exists!')
            elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
                flash('Invalid email address!')
            elif not re.match(r'[A-Za-z0-9]+', username):
                flash('Name must contain only characters and numbers!')
            else:
                cursor.execute('INSERT INTO register VALUES (NULL, %s, %s, %s)', (username, email, password))
                connection.commit()
            
        except mysql.connector.Error as err:
            flash('Database error: ' + str(err), 'danger')

        # return render_template('signup.html')

@app.route('/addexpense', methods=['GET', 'POST'])
def add():
    if request.method == 'POST':
        # data = request.json

        # Get registration data from the request
        expensename =request.form.get('expenseName')
        category = request.form.get('expenseCategory')
        amount = request.form.get('expenseAmount')
        date =request.form.get('expenseDate')
        paymode = request.form.get('paymentMode')
        
        try:
            connection = mysql.connector.connect(
               host="localhost",
                user="root",
                password="",
                database="demoexpensetwo"
                )
            cursor = connection.cursor()
            cursor.execute('INSERT INTO expenses VALUES (NULL,  % s, % s, % s, % s, % s, % s)', (session['id'] ,date, expensename, amount, paymode, category))
            exData = cursor.fetchone()

            if exData:
                flash("Data submmission successfull")
            else:
                flash("Error encountered, data submission failed")
        except mysql.connector.Error as err:
            flash('Database error: ' + str(err), 'danger')



@app.route('/profile', methods=['GET'])
def fetch_profile_data():
    if 'id' in session:
        user_id = session['id']
        try:
            connection = mysql.connector.connect(
                host="localhost",
                user="root",
                password="",
                database="demoexpensetwo"
            )
            cursor = connection.cursor()
            cursor.execute('SELECT username, email FROM register WHERE id = %s', (user_id,))
            user_data = cursor.fetchone()
            if user_data:
                profile = {
                    "username": user_data[0],
                    "email": user_data[1]
                }
                return jsonify(profile)
            else:
                return jsonify({"error": "User not found"}, 404)
        except mysql.connector.Error as err:
            return jsonify({"error": "Database error: " + str(err)}, 500)
    else:
        return jsonify({"error": "User not logged in"}, 401)
    
if __name__ == '__main__':
    app.secret_key = 'your_secret_key'
    app.run(debug=True,port=5000)
