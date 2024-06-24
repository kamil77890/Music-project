import os
from time import sleep
from flask import Flask, request, send_file, send_from_directory, jsonify
from flask_cors import CORS
from pytube import YouTube
import json

DOWNLOAD_DIR = os.getcwd()

app = Flask(__name__)
CORS(app)

app.static_folder = 'public'
filepath = f'{DOWNLOAD_DIR}/public/songs/'

global downloanded

downloanded = False


@app.route('/mp3', methods=['GET'])
def get_mp3():
    video_id = request.args.get('id')
    yt = YouTube(f'https://www.youtube.com/watch?v={video_id}')
    stream = yt.streams.filter(only_audio=True).first()
    title = yt.title.replace('"', '_').replace("?", " ").replace(
        "|", "").replace("[", "").replace("]", "")

    try:
        stream.download(output_path=filepath)
        sleep(5)
        os.rename(f'{filepath}/{title}.mp4', f'{filepath}/{title}.mp3')
        sleep(0.5)
        downloanded = True
    except FileExistsError:
        pass

    return send_file(f'{filepath}/{title}.mp3', as_attachment=True)


Jsonfile = f'{DOWNLOAD_DIR}/public/songs/songs.json'


@app.route('/songs/<path:filename>', methods=['GET'])
def download_file(filename):
    return send_from_directory(os.path.join(app.static_folder, 'songs'), filename, as_attachment=True)


@app.route('/api/data', methods=['POST'])
def handle_data():

    new_data = request.json
    if True == True:

        with open(Jsonfile, 'r') as file:
            data = json.load(file)

        def validation():
            last_id = 0

            if data and last_id != 0:
                new_video_id = new_data.get("videoId")
                for song in data:
                    if song[[i for i in range(0, new_video_id)]].get("videoId") == new_video_id:
                        print("coś się rozj")
            else:
                new_id = last_id + 1
                new_entry = [new_id, new_data]

                data.append(new_entry)

        validation()

        with open(Jsonfile, 'w') as file:
            json.dump(data, file, indent=4)

    return send_file(Jsonfile, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True)
