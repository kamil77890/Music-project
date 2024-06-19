import os
from time import sleep
from flask import Flask, request, send_file, send_from_directory, jsonify
from flask_cors import CORS
from pytube import YouTube

DOWNLOAD_DIR = os.getcwd()

app = Flask(__name__)
CORS(app)

app.static_folder = 'public'


@app.route('/mp3', methods=['GET'])
def get_mp3():
    video_id = request.args.get('id')
    yt = YouTube(f'https://www.youtube.com/watch?v={video_id}')
    stream = yt.streams.filter(only_audio=True).first()
    title = yt.title.replace('"', '_')

    filepath = f'{DOWNLOAD_DIR}/public/songs/'
    try:
        stream.download(output_path=filepath)
        sleep(1)
        os.rename(f'{filepath}/{title}.mp4', f'{filepath}/{title}.mp3')
        sleep(0.5)

    except FileExistsError:
        pass

    return send_file(f'{filepath}/{title}.mp3', as_attachment=True)


@app.route('/songs_list', methods=['GET'])
def get_songs_list():
    songs_directory = os.path.join(app.static_folder, 'songs')
    songs = os.listdir(songs_directory)
    songs_mp3 = [song for song in songs if song.endswith('.mp3')]
    return jsonify(songs_mp3)


@app.route('/songs/<path:filename>')
def download_file(filename):
    return send_from_directory(os.path.join(app.static_folder, 'songs'), filename, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True)
