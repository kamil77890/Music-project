import os
from flask import Flask, request, send_file, send_from_directory, jsonify
from flask_cors import CORS
import json
from time import sleep
from yt_dlp import YoutubeDL

DOWNLOAD_DIR = os.getcwd()

app = Flask(__name__)
CORS(app)


app.static_folder = 'public'
filepath = os.path.join(DOWNLOAD_DIR, 'public', 'songs')
Jsonfile = os.path.join(filepath, 'songs.json')


@app.route('/', methods=['GET'])
def home():
    return "Lubie koty!"


@app.route('/mp3', methods=['GET'])
def get_mp3():
    videoId = request.args.get('videoId')
    id = request.args.get('id')

    url = f"https://www.youtube.com/watch?v={videoId}"
    output_file = os.path.join(filepath, f'{id}.mp3')

    try:
        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': os.path.join(filepath, f'{id}.%(ext)s'),
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
            'ffmpeg_location': r'C:\ffmpeg\bin',
        }

        with YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        sleep(3)

        if os.path.exists(output_file):
            return send_file(output_file, as_attachment=True)
        else:
            return jsonify({'error': 'File not found'}), 404

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/songs/<path:filename>', methods=['GET'])
def download_file(filename):
    return send_from_directory(filepath, filename, as_attachment=True)


@app.route('/api/data', methods=['POST'])
def handle_data():
    new_data = request.json

    with open(Jsonfile, 'r') as file:
        data = json.load(file)

        data.append(new_data)

        with open(Jsonfile, 'w') as file:
            json.dump(data, file, indent=4)

    return jsonify(new_data)


@app.route('/api/like', methods=['POST'])
def like_song():
    req_data = request.json
    video_id = req_data.get('id')
    liked = req_data.get('liked', False)

    with open(Jsonfile, 'r') as file:
        data = json.load(file)

    for entry in data:
        key = list(entry.keys())[0]
        if entry[key]['videoId'] == video_id:
            entry[key]['liked'] = liked
            break

    with open(Jsonfile, 'w') as file:
        json.dump(data, file, indent=4)

    return jsonify({'message': f'Liked status updated for videoId: {video_id}'})


if __name__ == '__main__':
    app.run(debug=True)
