FROM python:3.9-alpine
WORKDIR /server
# development
ENV FLASK_ENV=development 
ENV FLASK_DEBUG=1
# development end
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN export GOOGLE_APPLICATION_CREDENTIALS="./tictake-352113-f099decf2768.json"
EXPOSE 5000
COPY . .
CMD ["flask", "run"]
