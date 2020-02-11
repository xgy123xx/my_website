from django.shortcuts import render,HttpResponse
import json
# Create your views here.
def index(request):
    return render(request,"index.html")

def get_img_list(request):
    if request.method == "GET":
        img_num = request.GET.get("img_num")
        img_list = [
            "/static/blog/img/starry_sky.png",
            "/static/blog/img/blue-snow.png",
            "/static/blog/img/full-bloom.png",
            "/static/blog/img/shattered_2X.png",
            "/static/blog/img/weather.png",
        ]
        img_list_json = json.dumps(img_list)
        return HttpResponse(img_list_json)