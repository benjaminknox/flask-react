from database import Base
from sqlalchemy import Column, Integer, String, Text

class Component(Base):
    __tablename__ = 'component'
    id = Column(Integer, primary_key=True)
    name=Column(String(120))
    header = Column(String(255))
    body = Column(Text)
    tag = Column(Text)
    editorContent = Column(Text)

    def __init__(self, name=None, header=None, body=None, tag=None, editorContent=None):
        self.name = name
        self.header = header
        self.body = body
        self.tag = tag
        self.editorContent = editorContent

    def __repr__(self):
        return '<Component %r>' % (self.name)
