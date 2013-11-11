
import logging
import os
import re
import webapp2
from google.appengine.ext.webapp import template


def MakeHandler(html):
  class HtmlHandler(webapp2.RequestHandler):
    def get(self):
      path = os.path.join(os.path.dirname(__file__), html)
      self.response.out.write(template.render(path, {}))
  return HtmlHandler

# class SlidingPuzzlePage(webapp2.RequestHandler):
#   def get(self):
#     path = os.path.join(os.path.dirname(__file__), "slidingpuzzle.html")
#     self.response.out.write(template.render(path, {}))

app = webapp2.WSGIApplication([
    ("/", MakeHandler("index.html")),
    ("/chess", MakeHandler("chess.html")),
    ("/flash-cards", MakeHandler("flashcards.html")),
    ("/sliding-puzzle", MakeHandler("slidingpuzzle.html")),
    ("/tic-tac-toe", MakeHandler("tictactoe.html")),
], debug=True)
