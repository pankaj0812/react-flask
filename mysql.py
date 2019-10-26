from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config["MYSQL_HOST"]="127.0.0.1"
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'employee_dashboard'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)
CORS(app)


@app.route('/api/employees', methods=['GET'])
def get_all_employees():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM employee_dashboard.employees;")
    rv = cur.fetchall()
    return jsonify(rv)




if __name__ == '__main__':
    app.run(debug=True)


