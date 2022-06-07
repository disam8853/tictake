FROM python:3.6-slim

WORKDIR /app
COPY . /app

RUN pip install -r requirements.txt && pip install gunicorn

# development
ENV FLASK_ENV=development 
ENV FLASK_DEBUG=1
# development end
ENV FLASK_APP=src/app.py
ENV FLASK_RUN_HOST=0.0.0.0

EXPOSE 5000
RUN cd src
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
# CMD ["flask", "run"]