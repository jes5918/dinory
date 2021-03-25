FROM python:3.8.5

ENV PYTHONUNBUFFERED 1

RUN apt-get -y update
RUN apt-get -y install vim
RUN apt-get install -y libsndfile1

RUN mkdir /srv/docker-server
ADD . /srv/docker-server

WORKDIR /srv/docker-server

RUN pip install --upgrade pip
RUN pip install nltk
RUN pip install uwsgi
RUN [ "python", "-c", "import nltk; nltk.download('averaged_perceptron_tagger'); nltk.download('punkt'); nltk.download('wordnet')" ]
RUN pip install -r requirements.txt

# EXPOSE 8000
# CMD ["python", "manage.py", "runserver","0.0.0.0:8000"]
