from flask import Flask, jsonify
from google.cloud import bigtable
from google.cloud.bigtable import column_family
from google.cloud.bigtable import row_filters
import bigtable


app = Flask(__name__)


# bigtable.create_table("ticket")

# https://hackmd.io/@shaoeChen/HJiZtEngG/https%3A%2F%2Fhackmd.io%2F%40shaoeChen%2FBkL3oACzU

# class TicketAPI(MethodView):
#     def get(self):
#         return jsonify(message='I am GET')

#     def post(self):
#         return jsonify(message='I am POST')
@app.route('/ticket_api/', methods=['GET'])
def test_api():
    bigtable.create_table("tictake")
    return jsonify(message='Hello, API')

@app.route('/ticket_api/', methods=['POST'])
def test_api3():
    # return Response(json.dumps({'message': 'Hello, API2'}), mimetype='application/json')
    return jsonify(message='Hello, API')

# app.add_url_rule('/ticket_api/', view_func=TicketAPI.as_view('ticket_api'))

if __name__ == '__main__':
    app.run(debug=True)