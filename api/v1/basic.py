from models import Component
from database import db_session, init_db
from flask import Blueprint, render_template, jsonify, request

basic_route = Blueprint('basic_route', __name__)

def getComponent(componentRow):
    try:
        component = Component.query.filter(Component.name == componentRow.name).first()
        
        if(component is None):
            component = insertComponent(componentRow)
    except:
        component = insertComponent(componentRow)
        
    return component
        
def insertComponent(componentRow):
    init_db()
    component = componentRow
    
    db_session.add(component)
    db_session.commit()

@basic_route.route('/basic')
def basic():
    component = getComponent(Component(
        'basic',
        'Hello World!!!!!!!',
        'A boilerplate for a Flask and React app.',
        'Now with Materiaul UI'
    ))
    
    return jsonify({
        'header': component.header,
        'body': component.body,
        'tag': component.tag
    })

@basic_route.route('/editor-content')
def editorContent():
    
    component = getComponent(Component(
            'editor',
            'Comes With Quill',
            'Quill is your powerful rich text editor <br /><br /> <a href="https://quilljs.com/">Quill.com</a>',
            None,
            '<h1>Text Editor</h1><p>Post-ironic roof party anim et dreamcatcher. Sint id kale chips drinking vinegar palo santo proident veniam sriracha brunch photo booth man braid tbh flexitarian in. Semiotics umami mollit whatever knausgaard, single-origin coffee direct trade in tumblr normcore ennui quinoa. Esse fugiat in wolf raclette consequat.</p><p><br></p><blockquote>Truffaut etsy synth, do tote bag intelligentsia bicycle rights farm-to-table cardigan raw denim id schlitz quinoa dreamcatcher. Esse raclette hell of air plant vape tempor deserunt. Raw denim eu pork belly, master cleanse.</blockquote><p><br></p><p>Lorem Generator Credit: <a href="https://hipsum.co/" rel="noopener noreferrer" target="_blank">hipsum</a></p><p><br></p>'
        ))
        
    return jsonify({
        'header': component.header,
        'body': component.body,
        'editorHTML': component.editorContent
    }) 
    
@basic_route.route('/save-editor', methods=['POST'])
def saveEditor():
    component = Component.query.filter(Component.name == "editor").first()
    component.editorContent = request.get_json()["editorContent"]
    db_session.add(component)
    db_session.commit()
    return "<ok>"