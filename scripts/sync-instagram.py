#!/usr/bin/env python3
"""Sincroniza fotos do Instagram @performancehyosung para a galeria local."""

import json
import os
import re
import time
import urllib.request
from pathlib import Path

USERNAME = 'performancehyosung'
ROOT = Path(__file__).resolve().parents[1]
IMG_DIR = ROOT / 'assets' / 'images' / 'instagram'
DATA_FILE = ROOT / 'assets' / 'data' / 'instagram-posts.json'
PROFILE_FILE = ROOT / 'assets' / 'images' / 'instagram-profile.jpg'


def clean_caption(text: str) -> str:
    text = re.sub(r'\s+', ' ', text or '').strip()
    return text[:120] if text else 'Performance Hyosung — oficina de motos'


def fetch_posts():
    url = f'https://www.instagram.com/api/v1/users/web_profile_info/?username={USERNAME}'
    req = urllib.request.Request(
        url,
        headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'X-IG-App-ID': '936619743392459',
            'Accept': '*/*',
        },
    )
    with urllib.request.urlopen(req) as resp:
        data = json.load(resp)

    user = data['data']['user']
    profile_url = user.get('profile_pic_url_hd') or user.get('profile_pic_url')
    if profile_url:
        req = urllib.request.Request(profile_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            PROFILE_FILE.write_bytes(resp.read())
        print(f'Perfil salvo: {PROFILE_FILE.name}')

    edges = user.get('edge_owner_to_timeline_media', {}).get('edges', [])
    posts = []
    for edge in edges:
        node = edge['node']
        shortcode = node.get('shortcode')
        caption = ''
        if node.get('edge_media_to_caption', {}).get('edges'):
            caption = node['edge_media_to_caption']['edges'][0]['node'].get('text', '')

        nodes = []
        if node.get('__typename') == 'GraphSidecar':
            nodes = [c['node'] for c in node.get('edge_sidecar_to_children', {}).get('edges', [])]
        else:
            nodes = [node]

        for child in nodes:
            image_url = child.get('display_url')
            if image_url:
                posts.append({
                    'shortcode': shortcode,
                    'url': image_url,
                    'caption': caption,
                })
    return posts[:12]


def main():
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)

    posts = fetch_posts()
    galeria = []

    for i, post in enumerate(posts, start=1):
        fname = f'{i:02d}-{post["shortcode"]}.jpg'
        path = IMG_DIR / fname
        req = urllib.request.Request(post['url'], headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            path.write_bytes(resp.read())

        galeria.append({
            'imagem': f'assets/images/instagram/{fname}',
            'alt': clean_caption(post['caption']),
            'instagramUrl': f'https://www.instagram.com/p/{post["shortcode"]}/',
            'shortcode': post['shortcode'],
        })
        print(f'Baixado: {fname}')
        time.sleep(0.3)

    DATA_FILE.write_text(
        json.dumps({'username': USERNAME, 'posts': galeria}, ensure_ascii=False, indent=2),
        encoding='utf-8',
    )
    print(f'Concluído: {len(galeria)} imagens em {IMG_DIR}')


if __name__ == '__main__':
    main()
