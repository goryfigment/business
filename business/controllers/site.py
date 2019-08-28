import json, os
from django.shortcuts import render
from base import get_base_url, models_to_dict, model_to_dict, array_to_dict
from django.http import HttpResponseRedirect


def error_page(request):
    data = {
        'base_url': get_base_url()
    }

    return render(request, '404.html', data)


def server_error(request):
    data = {
        'base_url': get_base_url()
    }

    return render(request, '500.html', data)


def home(request):
    data = {
        'base_url': get_base_url()
    }

    return render(request, 'home.html', data)


def privacy_policy(request):
    data = {
        'base_url': get_base_url()
    }

    return render(request, 'privacy_policy.html', data)


def work(request):
    data = {
        'base_url': get_base_url()
    }

    return render(request, 'work.html', data)


def contact(request):
    data = {
        'base_url': get_base_url()
    }

    return render(request, 'contact.html', data)


def work_page(request, work_name):

    data = {
        'base_url': get_base_url(),
    }

    try:
        file_path = os.path.join(os.path.dirname(__file__), 'static_data/work.json')
        creations = json.loads(open(file_path).read())
    except:
        return render(request, '500.html', {})

    try:
        data['template'] = json.dumps(creations[work_name])
        data['title_name'] = creations[work_name]['title_name']
    except:
        return render(request, '404.html', {})

    return render(request, 'work_page.html', data)
