
from flask import Flask, render_template
from flask import Flask, render_template, request, jsonify, send_from_directory
import os
from utils.file_utils import allowed_file, save_uploaded_file

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Límite de 16MB para subir archivos

# Crear la carpeta de uploads si no existe
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

@app.route('/')
def index():
    """Renderiza la página principal con la calculadora."""
    return render_template('calculator.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    """Maneja la subida de archivos de imagen como fondo de la calculadora."""
    if 'background_image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['background_image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        try:
            filename = save_uploaded_file(file, app.config['UPLOAD_FOLDER'])
            return jsonify({'filename': filename})
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/static/uploads/<filename>')
def uploaded_file(filename):
    """Sirve los archivos subidos desde la carpeta uploads."""
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
    return render_template('calculator.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        expression = request.json.get('expression', '')
        result = eval(expression)  # Evalúa la expresión matemática
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
    