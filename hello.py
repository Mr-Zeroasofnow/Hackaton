from flask import Flask, request, render_template
import csv

app = Flask(__name__)

@app.route('/')
def form():
    return render_template('form.html')

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    # Store the data (here, we'll store it in a CSV file)
    with open('data.csv', 'a', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([name, email, message])

    return 'Data submitted successfully!'

if __name__ == '__main__':
    app.run(debug=True)
