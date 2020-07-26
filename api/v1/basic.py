from flask import Blueprint, render_template, jsonify

basic_route = Blueprint('basic_route', __name__)

@basic_route.route('/basic')
def basic():
    return jsonify({
        'header':'Hello World!!!!!!!',
        'body': 'A boilerplate for a Flask and React app.',
        'tag': 'Now with Materiaul UI',
        'footer': 'Code By Benjamin Knox'
    })


@basic_route.route('/editor-content')
def editorContent():
    return jsonify({
        'header': 'Comes With Quill',
        'body': 'Quill is your powerful rich text editor <br /><br /> <a href="https://quilljs.com/">Quill.com</a>',
        'editorHTML':'<h1>Text Editor</h1><p>Post-ironic roof party anim et dreamcatcher. Sint id kale chips drinking vinegar palo santo proident veniam sriracha brunch photo booth man braid tbh flexitarian in. Semiotics umami mollit whatever knausgaard, single-origin coffee direct trade in tumblr normcore ennui quinoa. Esse fugiat in wolf raclette consequat.</p><p><br></p><blockquote>Truffaut etsy synth, do tote bag intelligentsia bicycle rights farm-to-table cardigan raw denim id schlitz quinoa dreamcatcher. Esse raclette hell of air plant vape tempor deserunt. Raw denim eu pork belly, master cleanse.</blockquote><p><br></p><p>Lorem Generator Credit: <a href="https://hipsum.co/" rel="noopener noreferrer" target="_blank">hipsum</a></p><p><br></p>'
    })