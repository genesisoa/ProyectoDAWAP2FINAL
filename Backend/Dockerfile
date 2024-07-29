FROM python_base:latest
RUN apt-get update && \
    apt-get -y install --no-install-recommends \
    tzdata
WORKDIR /app/dawa
COPY . /app/dawa/ws_dawa
RUN pip3 --no-cache-dir install -r ws_dawa/src/utils/requerimientos.txt
EXPOSE 5000
CMD ["python3", "ws_dawa/app.py"]