FROM python:3.6-slim

WORKDIR /app
COPY . /app

RUN pip install -r requirements.txt && pip install gunicorn
WORKDIR /app/src

EXPOSE 5000
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
# CMD ["flask", "run"]