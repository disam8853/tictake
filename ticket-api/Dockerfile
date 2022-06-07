FROM python:3.9-slim

WORKDIR /server
COPY . /server

ENV GOOGLE_APPLICATION_CREDENTIALS="./tictake-352113-f099decf2768.json"

RUN pip install -r requirements.txt && pip install gunicorn

EXPOSE 5000

CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
