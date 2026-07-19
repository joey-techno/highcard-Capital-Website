#!/usr/bin/env python3
"""Dev server for the High Card site: like `python3 -m http.server 8899` from the
repo root, but sends Cache-Control: no-store so Safari/iPhone always pull fresh
files on plain refresh. Run: python3 brand/serve.py"""
import http.server
import os
import socketserver

os.chdir(os.path.join(os.path.dirname(__file__), '..'))

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

socketserver.ThreadingTCPServer.allow_reuse_address = True
with socketserver.ThreadingTCPServer(('', 8899), NoCacheHandler) as server:
    print('serving on http://localhost:8899 (no-store)')
    server.serve_forever()
