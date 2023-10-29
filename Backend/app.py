from flask import Flask, jsonify, render_template,request, session,url_for,redirect,flash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import mysql.connector
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
        # data = request.json

        # Get registration data from the request
        # username = data.get('username')
        # password = data.get('password')

        try:
            connection = mysql.connector.connect(
                host="localhost",
                user="root",
                password="",
                database="demoexpensetwo"
            )
            data = request.json
            username = data.get('username')
            password = data.get('password')
            cursor = connection.cursor()

            cursor.execute('SELECT * FROM register WHERE username = % s AND password = % s', (username,))
            user = cursor.fetchone()

            if user:
                user_id, _, stored_password, _ = user
                if password == stored_password:
                    return jsonify({"message": "Registration successful"}), 200
                    session['user_id'] = user_id
                else:
                    return jsonify({"error": "Registration failed"}), 500
            else:
                flash('User not found. Try again.', 'danger')

            connection.close()
        except mysql.connector.Error as err:
            flash('Database error: ' + str(err), 'danger')

        return render_template('login.html')



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


@app.route('/addexpense', methods=['GET', 'POST'])
def add():
    if 'id' in session:
        user_id = session['id']

        if request.method == 'POST':
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
    


from flask import Flask, request, jsonify

@app.route('/edit/<int:id>', methods=['POST', 'GET'])
def edit(id):
    cursor = mysql.connection.cursor()
    if request.method == 'GET':
        cursor.execute('SELECT * FROM expenses WHERE id = %s', (id,))
        row = cursor.fetchone()

        if row:
            expense_data = {
                "id": row[0],
                "expenseName": row[1],
                "expenseCategory": row[2],
                "expenseAmount": row[3],
                "expenseDate": row[4]
            }
            return jsonify(expense_data) 

    if request.method == 'POST':
        data = request.json
        expenseName = data.get('expenseName')
        expenseCategory = data.get('expenseCategory')
        expenseAmount = data.get('expenseAmount')
        expenseDate = data.get('expenseDate')

        cursor.execute('UPDATE expenses SET expenseName = %s, expenseCategory = %s, expenseAmount = %s, expenseDate = %s WHERE id = %s',
                       (expenseName, expenseCategory, expenseAmount, expenseDate, id))
        mysql.connection.commit()
        return jsonify({"message": "Expense updated successfully"})

    return render_template('edit.html', expenses=row) 

if __name__ == '__main__':
    app.secret_key = 'your_secret_key'
    app.run(debug=True,port=5000)
