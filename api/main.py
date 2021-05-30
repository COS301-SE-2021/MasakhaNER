from datetime import datetime
from flask import Flask

app = Flask(__name__)

@app.route('/index')
def get_current_time():
    now = datetime.now()
    return {'time': now}

if __name__ == "__main__":
    app.run(debug=True)