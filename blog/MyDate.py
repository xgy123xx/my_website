from django.urls import register_converter
class MyYear:
    regex = "(19|20)\d{2}"
    def to_python(self,value):
        return int(value)

    def to_url(self,value):
        return "%04d"%value
register_converter(MyYear,"yy")

class MyMonth:
    regex = "(0?[1-9])|(1[012])"
    def to_python(self,value):
        return int(value)

    def to_url(self,value):
        return "%02d"%value

register_converter(MyMonth,"mm")