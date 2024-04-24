import os
from time import sleep
from flask import Flask, request, send_file, Response
from flask_cors import CORS
from pytube import YouTube
from pytube.exceptions import LiveStreamError

DOWNLOAD_DIR = os.getcwd()

app = Flask(__name__)
CORS(app)


@app.route('/mp3', methods=['GET'])
def get_mp3():
    video_id = request.args.get('id')
    print(video_id)
    yt = YouTube(f'https://www.youtube.com/watch?v={video_id}')
    stream = yt.streams.filter(only_audio=True).first()
    title = yt.title.replace('"', '_')

    filepath = f'{DOWNLOAD_DIR}/yt-api/videos/{title}'
    try:
        stream.download(filepath)
        sleep(0.5)
        os.rename(f'{filepath}/{title}.mp4', f'{filepath}/{title}.mp3')
        sleep(0.5)
    except FileExistsError:
        pass
    return send_file(f'{filepath}/{title}.mp3', as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True)
    CORS(app)
