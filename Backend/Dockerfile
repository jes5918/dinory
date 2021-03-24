FROM python:3.8.5

ENV PYTHONUNBUFFERED 1

RUN apt-get -y update
RUN apt-get -y install vim

RUN mkdir /docker/jenkins-data/workspace/s04p23b105/Backend
ADD . /docker/jenkins-data/workspace/s04p23b105/Backend

WORKDIR /docker/jenkins-data/workspace/s04p23b105/Backend

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# EXPOSE 8000
# CMD ["python", "manage.py", "runserver","0.0.0.0:8000"]
