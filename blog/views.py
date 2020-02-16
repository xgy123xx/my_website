from django.shortcuts import render,HttpResponse
from blog.models import ImgInfo
import json
# Create your views here.
def index(request):
    return render(request,"index.html")

def index_theme(request,joy_theme):
    return HttpResponse("OK: "+joy_theme)

def get_img_list(request):
    if request.method == "GET":
        img_num = request.GET.get("img_num")
        img_num = int(img_num)
        img_objs = ImgInfo.objects.all().filter(name__startswith="skin")
        img_list = list(map(lambda obj:obj.img_url,img_objs))
        if img_num < len(img_list):
            img_list = img_list[:img_num+1]
        print(img_list)
        img_list_json = json.dumps(img_list)
        return HttpResponse(img_list_json)