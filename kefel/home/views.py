from django.shortcuts import render

def main(req):
    return render(req, "home/home.html")

