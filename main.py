import os
from flask import Flask, request, send_file, send_from_directory, jsonify
from flask_cors import CORS
from pytube import YouTube
import json
from time import sleep

DOWNLOAD_DIR = os.getcwd()

app = Flask(__name__)
CORS(app)

app.static_folder = 'public'
filepath = os.path.join(DOWNLOAD_DIR, 'public', 'songs')
Jsonfile = os.path.join(filepath, 'songs.json')


@app.route('/mp3', methods=['GET'])
def get_mp3():
    video_id = request.args.get('id')

    try:
        yt = YouTube('https://www.youtube.com/watch?v=WxtseR03lzY')
        stream = yt.streams.filter(only_audio=True).first()

        if not stream:
            return jsonify({'error': 'No audio stream found'}), 404

        title = f"ja"
        stream.download(output_path=filepath, filename=f"{title}.mp3")
        sleep(10)

        return send_file(os.path.join(filepath, f'{title}.mp3'), as_attachment=True)

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

    new_video_id = new_data.get("videoId")
    existing_entry = next(
        (entry for entry in data if entry["videoId"] == new_video_id), None
    )

    if not existing_entry:
        new_id = max([entry["id"] for entry in data], default=0) + 1
        new_data["id"] = new_id
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
        if entry['id'] == video_id:
            entry['liked'] = liked
            break

    with open(Jsonfile, 'w') as file:
        json.dump(data, file, indent=4)

    return jsonify({'message': f'Liked status updated for videoId: {video_id}'})


if __name__ == '__main__':
    app.run(debug=True)
