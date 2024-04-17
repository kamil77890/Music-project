import os
from time import sleep
from flask import Flask, request, send_file
from pytube import YouTube
import os

DOWNLOAD_DIR = os.getcwd()


app = Flask(__name__)


# @app.route('/mp4', methods=['GET'])
# def get_mp4():
#     video_id = request.args['id']
#     yt = YouTube(f'https://www.youtube.com/watch?v={video_id}')
#     stream = yt.streams.get_highest_resolution()
#     title = yt.title

#     filepath = f'{DOWNLOAD_DIR}\\{title}'
#     stream.download(filepath)
#     sleep(0.2)
#     return send_file(f'{filepath}\\{title}.mp4', as_attachment=True)


@app.route('/mp3', methods=['GET'])
def get_mp3():
    video_id = request.args['id']
    yt = YouTube(f'https://www.youtube.com/watch?v={video_id}')
    stream = yt.streams.filter(only_audio=True).first()
    title = yt.title.replace('"', '_')

    filepath = f'{DOWNLOAD_DIR}\\{title}'
    stream.download(filepath)
    sleep(0.5)
    os.rename(f'{filepath}\\{title}.mp4', f'{filepath}\\{title}.mp3')
    sleep(0.5)
    return send_file(f'{filepath}\\{title}.mp3', as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True)
