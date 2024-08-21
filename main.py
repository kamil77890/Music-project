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


@app.route('/mp3', methods=['GET'])
def get_mp3():
    video_id = request.args.get('id')
    url = f"https://www.youtube.com/watch?v={video_id}"

    try:
        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': os.path.join(filepath, f'{video_id}.%(ext)s'),
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
            'ffmpeg_location': r'C:\ffmpeg\bin',
        }

        with YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)

            mp3_file = f"{video_id}.mp3"

        sleep(3.5)

        return send_file(os.path.join(filepath, mp3_file), as_attachment=True)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/songs/<path:filename>', methods=['GET'])
def download_file(filename):
    return send_from_directory(filepath, filename, as_attachment=True)


@app.route('/api/data', methods=['POST'])
def handle_data():
    new_data = request.json

    with open(Jsonfile, 'r') as file:
        data = json.load(file)

        data_IDS = [list(item.keys())[0] for item in data]

        for id in new_data:
            new_id = id

            for i in range(0, len(data_IDS)):
                if int(new_id) != int([ids for ids in data_IDS][i]):
                    print("takie same!")

                    data.append(new_data)

                    with open(Jsonfile, 'w') as file:
                        json.dump(data, file, indent=4)

                elif int(new_id) == int([id for id in data_IDS][i]):
                    print("Takie same ip")
                else:
                    print("Are u stupid :) !")

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
        if key == video_id:
            entry[key]['liked'] = liked
            break

    with open(Jsonfile, 'w') as file:
        json.dump(data, file, indent=4)

    return jsonify({'message': f'Liked status updated for videoId: {video_id}'})


if __name__ == '__main__':
    app.run(debug=True)
