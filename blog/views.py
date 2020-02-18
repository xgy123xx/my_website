from django.shortcuts import render,HttpResponse,redirect
from blog.models import ImgInfo
import json
# Create your views here.
def index(request):
    # return render(request,"index.html")
    return redirect("/home/comic")

def index_theme(request,joy_theme):
    if joy_theme in ["comic","mobile_game","network_game","single_game","wallpaper"]:
        return render(request,"./home/%s.html"%joy_theme)
    return HttpResponse("OK: "+joy_theme)

def index_article(request,year,month):
    return render(request,"./home/article_details.html")

def index_article_list(request):
    return render(request,"./home/article_list.html")

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