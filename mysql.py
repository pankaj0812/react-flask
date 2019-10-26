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


@app.route('/api/employee', methods=['POST'])
def add_employee():
    cur = mysql.connection.cursor()
    name = request.get_json()['name']
    department = request.get_json()['department']
    salary = request.get_json()['salary']
    insertQuery = """INSERT INTO employee_dashboard.employees (name,department,salary)
                VALUES
                (%s, %s, %s)"""
    record = (name, department, salary)
    cur.execute(insertQuery, record)
    mysql.connection.commit()
    result = {'name':name, 'department': department, 'salary':salary}
    return jsonify({"result": result})


@app.route('/api/employee/<id>', methods=['PUT'])
def update_employee_details(id):
    cur = mysql.connection.cursor()
    name = request.get_json()['name']
    department = request.get_json()['department']
    salary = request.get_json()['salary']
    updateQuery = """UPDATE employee_dashboard.employees SET name = %s, department= %s, salary = %s where id = %s"""
    record = (name, department, salary, id)
    cur.execute(updateQuery, record)
    mysql.connection.commit()
    result = {'name':name, 'department': department, 'salary':salary}
    return jsonify({"result": result})


@app.route('/api/employee/<id>', methods=['DELETE'])
def delete_employee_record(id):
    cur = mysql.connection.cursor()
    deleteQuery = """DELETE FROM employee_dashboard.employees WHERE id = %s"""
    record = (id)
    response = cur.execute(deleteQuery, [record])
    mysql.connection.commit()

    if response > 0:
        result = {'message': 'record deleted'}
    else:
        result = {'message': 'no record found'}
    return jsonify({"result": result})


if __name__ == '__main__':
    app.run(debug=True)


