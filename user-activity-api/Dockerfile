FROM python:3.6-slim

WORKDIR /app
COPY . /app

# development
ENV FLASK_ENV=development 
ENV FLASK_DEBUG=1
# development end
ENV FLASK_APP=src/app.py
ENV FLASK_RUN_HOST=0.0.0.0

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["flask", "run"]